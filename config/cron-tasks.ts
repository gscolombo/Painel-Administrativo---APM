import updateGoogleMapsReviews from "../src/api/global/services/google_cloud_api_connector"

export default {
    GoogleMapsReviewsFetch: {
        task: updateGoogleMapsReviews,
        options: { rule: "0 0 0 * * *" }
    }
}