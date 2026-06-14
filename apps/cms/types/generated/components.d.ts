import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksBlobHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_blob_heroes';
  info: {
    description: 'Brand homepage hero with blob-masked photo and dual CTAs';
    displayName: 'Blob Hero';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    highlightWord: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    note: Schema.Attribute.Text;
    primary: Schema.Attribute.Component<'shared.link', false>;
    secondary: Schema.Attribute.Component<'shared.link', false>;
    subheading: Schema.Attribute.Text;
  };
}

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

export interface BlocksCtaBand extends Struct.ComponentSchema {
  collectionName: 'components_blocks_cta_bands';
  info: {
    description: 'Call-to-action band with primary and secondary actions';
    displayName: 'CTA Band';
  };
  attributes: {
    body: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primary: Schema.Attribute.Component<'shared.link', false>;
    secondary: Schema.Attribute.Component<'shared.link', false>;
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

export interface BlocksFormEmbed extends Struct.ComponentSchema {
  collectionName: 'components_blocks_form_embeds';
  info: {
    description: 'Embedded JotForm for registration, enquiries, or referrals';
    displayName: 'Form Embed';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    height: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 1200;
          min: 400;
        },
        number
      > &
      Schema.Attribute.DefaultTo<600>;
    jotformId: Schema.Attribute.String & Schema.Attribute.Required;
    trackingParams: Schema.Attribute.JSON;
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

export interface BlocksLeadForm extends Struct.ComponentSchema {
  collectionName: 'components_blocks_lead_forms';
  info: {
    description: 'Native first-party lead capture form stored in Strapi';
    displayName: 'Lead Form';
  };
  attributes: {
    description: Schema.Attribute.Text;
    formType: Schema.Attribute.Enumeration<['expression-of-interest']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'expression-of-interest'>;
    heading: Schema.Attribute.String;
    successMessage: Schema.Attribute.Text;
  };
}

export interface BlocksLogoItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_logo_items';
  info: {
    description: 'Partner logo for marquee';
    displayName: 'Logo Item';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface BlocksLogoMarquee extends Struct.ComponentSchema {
  collectionName: 'components_blocks_logo_marquees';
  info: {
    description: 'Scrolling partner logo marquee';
    displayName: 'Logo Marquee';
  };
  attributes: {
    heading: Schema.Attribute.String;
    logos: Schema.Attribute.Component<'blocks.logo-item', true>;
  };
}

export interface BlocksPersonaCardItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_persona_card_items';
  info: {
    description: 'Single persona card';
    displayName: 'Persona Card Item';
  };
  attributes: {
    accent: Schema.Attribute.Enumeration<
      ['blue', 'purple', 'yellow', 'green', 'pink']
    >;
    cta: Schema.Attribute.Component<'shared.link', false>;
    description: Schema.Attribute.Text;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    iconKey: Schema.Attribute.Enumeration<
      ['teaching', 'support', 'global', 'community', 'school', 'leadership']
    >;
    needs: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksPersonaCards extends Struct.ComponentSchema {
  collectionName: 'components_blocks_persona_cards';
  info: {
    description: 'Grid of persona cards';
    displayName: 'Persona Cards';
  };
  attributes: {
    cards: Schema.Attribute.Component<'blocks.persona-card-item', true>;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
  };
}

export interface BlocksRegionGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_region_grids';
  info: {
    description: 'Grid of country/region tiles linking to market sites';
    displayName: 'Region Grid';
  };
  attributes: {
    heading: Schema.Attribute.String;
    regions: Schema.Attribute.Component<'blocks.region-item', true>;
    subheading: Schema.Attribute.Text;
  };
}

export interface BlocksRegionItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_region_items';
  info: {
    description: 'Country or region tile in a region grid';
    displayName: 'Region Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    flagKey: Schema.Attribute.Enumeration<['aus', 'uk', 'can', 'nz', 'usa']> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksRichText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_rich_texts';
  info: {
    description: 'Free-form text content for about pages, policies, and process pages';
    displayName: 'Rich Text';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface BlocksSharedSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_shared_sections';
  info: {
    description: 'Reference to a reusable section';
    displayName: 'Shared Section';
  };
  attributes: {
    section: Schema.Attribute.Relation<'oneToOne', 'api::section.section'>;
  };
}

export interface BlocksStatItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stat_items';
  info: {
    description: 'Single statistic for a stats row';
    displayName: 'Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksStatsBand extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stats_bands';
  info: {
    description: 'Statistics band section';
    displayName: 'Stats Band';
  };
  attributes: {
    footnote: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'blocks.stat-item', true>;
  };
}

export interface BlocksStatsRow extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stats_rows';
  info: {
    description: 'Row of headline statistics for regional home pages';
    displayName: 'Stats Row';
  };
  attributes: {
    stats: Schema.Attribute.Component<'blocks.stat-item', true>;
  };
}

export interface BlocksStepItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_step_items';
  info: {
    description: 'Single process step';
    displayName: 'Step Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksStepsRow extends Struct.ComponentSchema {
  collectionName: 'components_blocks_steps_rows';
  info: {
    description: 'Process steps row';
    displayName: 'Steps Row';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'blocks.step-item', true>;
    title: Schema.Attribute.String;
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

export interface BlocksTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonial_items';
  info: {
    description: 'Single testimonial quote';
    displayName: 'Testimonial Item';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    role: Schema.Attribute.String;
  };
}

export interface BlocksTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonial_grids';
  info: {
    description: 'Testimonial grid section';
    displayName: 'Testimonials';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<'blocks.testimonial-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksValueItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_value_items';
  info: {
    description: 'Single BE GREAT value entry';
    displayName: 'Value Item';
  };
  attributes: {
    letter: Schema.Attribute.String & Schema.Attribute.Required;
    summary: Schema.Attribute.Text & Schema.Attribute.Required;
    word: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksValueTabs extends Struct.ComponentSchema {
  collectionName: 'components_blocks_value_tabs';
  info: {
    description: 'BE GREAT values tabbed display';
    displayName: 'Value Tabs';
  };
  attributes: {
    autoAdvance: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    values: Schema.Attribute.Component<'blocks.value-item', true>;
  };
}

export interface BlocksValuesGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_values_grids';
  info: {
    description: 'BE GREAT values section with tabbed or listed values';
    displayName: 'Values Grid';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    values: Schema.Attribute.Component<'blocks.value-item', true>;
  };
}

export interface NavColumn extends Struct.ComponentSchema {
  collectionName: 'components_nav_columns';
  info: {
    description: 'Footer navigation column';
    displayName: 'Footer Column';
  };
  attributes: {
    heading: Schema.Attribute.String;
    links: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface NavFooter extends Struct.ComponentSchema {
  collectionName: 'components_nav_footers';
  info: {
    description: 'Footer navigation columns';
    displayName: 'Footer Nav';
  };
  attributes: {
    columns: Schema.Attribute.Component<'nav.column', true>;
  };
}

export interface NavItem extends Struct.ComponentSchema {
  collectionName: 'components_nav_items';
  info: {
    description: 'Header navigation item with optional children';
    displayName: 'Nav Item';
  };
  attributes: {
    children: Schema.Attribute.Component<'nav.item', true>;
    link: Schema.Attribute.Component<'shared.link', false> &
      Schema.Attribute.Required;
  };
}

export interface NavMenu extends Struct.ComponentSchema {
  collectionName: 'components_nav_menus';
  info: {
    description: 'Header navigation menu';
    displayName: 'Nav Menu';
  };
  attributes: {
    items: Schema.Attribute.Component<'nav.item', true>;
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

export interface SharedAnalyticsOverride extends Struct.ComponentSchema {
  collectionName: 'components_shared_analytics_overrides';
  info: {
    description: 'Per-region GTM container override';
    displayName: 'Analytics Override';
  };
  attributes: {
    gtmContainerId: Schema.Attribute.String & Schema.Attribute.Required;
    regionCode: Schema.Attribute.Enumeration<
      ['international', 'au', 'uk', 'ca', 'nz']
    > &
      Schema.Attribute.Required;
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

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'Internal page relation or external URL';
    displayName: 'Link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    url: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'light', 'outline']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    description: 'Navigation link with optional dropdown children';
    displayName: 'Nav Item';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.nav-link', true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_links';
  info: {
    description: 'Child navigation link (dropdown item)';
    displayName: 'Nav Link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media profile link';
    displayName: 'Social Link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'instagram', 'linkedin', 'twitter', 'youtube', 'tiktok']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.blob-hero': BlocksBlobHero;
      'blocks.cta': BlocksCta;
      'blocks.cta-band': BlocksCtaBand;
      'blocks.feature-grid': BlocksFeatureGrid;
      'blocks.feature-item': BlocksFeatureItem;
      'blocks.form-embed': BlocksFormEmbed;
      'blocks.hero': BlocksHero;
      'blocks.lead-form': BlocksLeadForm;
      'blocks.logo-item': BlocksLogoItem;
      'blocks.logo-marquee': BlocksLogoMarquee;
      'blocks.persona-card-item': BlocksPersonaCardItem;
      'blocks.persona-cards': BlocksPersonaCards;
      'blocks.region-grid': BlocksRegionGrid;
      'blocks.region-item': BlocksRegionItem;
      'blocks.rich-text': BlocksRichText;
      'blocks.shared-section': BlocksSharedSection;
      'blocks.stat-item': BlocksStatItem;
      'blocks.stats-band': BlocksStatsBand;
      'blocks.stats-row': BlocksStatsRow;
      'blocks.step-item': BlocksStepItem;
      'blocks.steps-row': BlocksStepsRow;
      'blocks.testimonial': BlocksTestimonial;
      'blocks.testimonial-item': BlocksTestimonialItem;
      'blocks.testimonials': BlocksTestimonials;
      'blocks.value-item': BlocksValueItem;
      'blocks.value-tabs': BlocksValueTabs;
      'blocks.values-grid': BlocksValuesGrid;
      'nav.column': NavColumn;
      'nav.footer': NavFooter;
      'nav.item': NavItem;
      'nav.menu': NavMenu;
      'shared.affiliate-brand': SharedAffiliateBrand;
      'shared.analytics-override': SharedAnalyticsOverride;
      'shared.job-board-config': SharedJobBoardConfig;
      'shared.link': SharedLink;
      'shared.nav-item': SharedNavItem;
      'shared.nav-link': SharedNavLink;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
