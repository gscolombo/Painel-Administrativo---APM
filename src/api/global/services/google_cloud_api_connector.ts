/**
 * google_cloud_api_connector service
 */
import axios from "axios";

export default async function updateGoogleMapsReviews() {
    const { GOOGLE_MAPS_PLACE_ID, GOOGLE_CLOUD_API_KEY} = process.env;

    const res = await axios.get(`https://places.googleapis.com/v1/places/${GOOGLE_MAPS_PLACE_ID}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': GOOGLE_CLOUD_API_KEY,
                'X-Goog-FieldMask': 'rating,reviews'
            }
        }
    )

    if (res.status == 200 && res.data) {
        const { rating, reviews } = res.data;

        const _reviews = [];
        for (const review of reviews) {            
            _reviews.push({
                rating: review.rating,
                author: review.authorAttribution.displayName,
                reviewText: review.text.text,
                publishTime: review.publishTime,
            })
        }

        console.log(`Average rating: ${rating}`);
        console.log(`Reviews: ${_reviews}`);
        
        await strapi.documents('api::global.global').update({
            documentId: "g49ke7ba6n12dyxpytnuakan",
            data: {
                googleReviews: {
                    averageRating: rating,
                    reviews: _reviews
                }
            }
        })
    }
};
