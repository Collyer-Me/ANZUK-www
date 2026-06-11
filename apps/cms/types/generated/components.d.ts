import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCta extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ctas';
  info: {
    description: 'Call to action band';
    displayName: 'CTA';
  };
  attributes: {
    body: Schema.Attribute.Text;
    buttonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    buttonUrl: Schema.Attribute.String & Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['primary', 'dark']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface BlocksFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_grids';
  info: {
    description: 'Grid of feature cards';
    displayName: 'Feature Grid';
  };
  attributes: {
    features: Schema.Attribute.Component<'blocks.feature-item', true>;
    heading: Schema.Attribute.String;
  };
}

export interface BlocksFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_items';
  info: {
    description: 'Single feature in a grid';
    displayName: 'Feature Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Enumeration<
      ['teaching', 'support', 'global', 'community']
    > &
      Schema.Attribute.DefaultTo<'teaching'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    description: 'Page hero section';
    displayName: 'Hero';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
    variant: Schema.Attribute.Enumeration<['default', 'dark']> &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlocksTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    description: 'Quote and attribution';
    displayName: 'Testimonial';
  };
  attributes: {
    authorName: Schema.Attribute.String & Schema.Attribute.Required;
    authorRole: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedAffiliateBrand extends Struct.ComponentSchema {
  collectionName: 'components_shared_affiliate_brands';
  info: {
    description: 'Linked affiliate brand (Scoot, ANZUK Executive, etc.)';
    displayName: 'Affiliate Brand';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedJobBoardConfig extends Struct.ComponentSchema {
  collectionName: 'components_shared_job_board_configs';
  info: {
    description: 'JobAdder integration settings for job listing pages';
    displayName: 'Job Board Config';
  };
  attributes: {
    externalApply: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    featuredOnly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    jobAdderBoardId: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Meta tags for search and social';
    displayName: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ogImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.cta': BlocksCta;
      'blocks.feature-grid': BlocksFeatureGrid;
      'blocks.feature-item': BlocksFeatureItem;
      'blocks.hero': BlocksHero;
      'blocks.testimonial': BlocksTestimonial;
      'shared.affiliate-brand': SharedAffiliateBrand;
      'shared.job-board-config': SharedJobBoardConfig;
      'shared.seo': SharedSeo;
    }
  }
}
