import type { Schema, Struct } from '@strapi/strapi';

export interface MiscGoogleReviews extends Struct.ComponentSchema {
  collectionName: 'components_misc_google_reviews';
  info: {
    displayName: 'Google Reviews';
  };
  attributes: {
    averageRating: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      >;
    reviews: Schema.Attribute.Component<'misc.review', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
        },
        number
      >;
  };
}

export interface MiscRating extends Struct.ComponentSchema {
  collectionName: 'components_misc_ratings';
  info: {
    displayName: 'Rating';
    icon: 'star';
  };
  attributes: {};
}

export interface MiscReview extends Struct.ComponentSchema {
  collectionName: 'components_misc_reviews';
  info: {
    displayName: 'Review';
    icon: 'star';
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.Required;
    publishTime: Schema.Attribute.DateTime & Schema.Attribute.Required;
    rating: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      >;
    reviewText: Schema.Attribute.Text;
  };
}

export interface SectionAreasDeAtuacao extends Struct.ComponentSchema {
  collectionName: 'components_section_areas_de_atuacaos';
  info: {
    displayName: '\u00C1reas de Atua\u00E7\u00E3o';
    icon: 'crown';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface SectionContato extends Struct.ComponentSchema {
  collectionName: 'components_section_contatoes';
  info: {
    displayName: 'Contato';
    icon: 'paperPlane';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    phoneNumber: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionSobre extends Struct.ComponentSchema {
  collectionName: 'components_section_sobres';
  info: {
    displayName: 'Sobre';
    icon: 'user';
  };
  attributes: {
    introductionText: Schema.Attribute.Text;
    profile: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'misc.google-reviews': MiscGoogleReviews;
      'misc.rating': MiscRating;
      'misc.review': MiscReview;
      'section.areas-de-atuacao': SectionAreasDeAtuacao;
      'section.contato': SectionContato;
      'section.sobre': SectionSobre;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
