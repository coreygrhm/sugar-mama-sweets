/**
 * ============================================================================
 *  SITE CONTENT CONFIG  —  EDIT THIS FILE TO CHANGE THE WEBSITE
 * ============================================================================
 *
 *  Almost everything a non-developer would want to change lives here: the
 *  business name, tagline, bio, contact links, ordering info, and the list of
 *  gallery photos. Edit the text between the quotes and save.
 *
 *  HOW TO CHANGE A PHOTO
 *  ---------------------
 *  1. Drop the image file into:  src/assets/
 *  2. Reference it here by its file name only (e.g. "hero.jpg").
 *     The site automatically optimizes and resizes it for you — feed it the
 *     full-resolution original, don't shrink it first.
 *  3. Always write a short, descriptive `alt` line (what's in the photo).
 *     This helps Google and screen readers.
 *
 *  Anything wrapped in [BRACKETS] is a placeholder — replace it. See the
 *  "Remaining TODOs" checklist in README.md.
 * ============================================================================
 */

export interface GalleryPhoto {
  /** File name inside src/assets/ (e.g. "baby-shower-bow.jpg") */
  src: string;
  /** Short description of what's in the photo (required, used for SEO + accessibility) */
  alt: string;
  /**
   * Set to true ONLY for photos featuring licensed/trademarked designs
   * (sports logos, cartoon characters, branded properties). These are kept
   * to a small minority and never used as the hero / share image.
   */
  licensedIp?: boolean;
}

export const site = {
  /** Business name — shown in the header, titles, and footer. */
  name: 'Sugar Mama Sweets',

  /** The baker / owner. */
  owner: 'Leslie Lewis',

  /** Where she's based. Shown in the hero, contact page, and SEO. */
  location: 'Scottsboro, Alabama',

  /** One-line tagline under the business name on the home hero. */
  tagline: "Hand-decorated sugar cookies for life's sweetest moments",

  /** The kinds of celebrations she's known for (shown on the home page). */
  knownFor: ['Baby Showers', 'Birthdays', 'Weddings'],

  /** Used for SEO meta descriptions and Open Graph (link previews). */
  description:
    'Custom hand-decorated sugar cookies by Leslie Lewis in Scottsboro, Alabama — ' +
    'made to order for baby showers, birthdays, weddings, and every celebration in between.',

  /**
   * Production domain (no trailing slash).
   * Mirrored in astro.config.mjs (`SITE_URL`) and public/robots.txt (Sitemap).
   */
  url: 'https://sugarmamasweets.shop',

  // --------------------------------------------------------------------------
  //  CONTACT + SOCIAL
  //  Leave a field as an empty string ('') to hide that link everywhere.
  //  A value wrapped in [BRACKETS] is treated as a not-yet-filled placeholder.
  // --------------------------------------------------------------------------
  contact: {
    // TODO: add the real order email (e.g. 'hello@sugarmamasweets.com').
    // While this stays bracketed, the email shows as a "coming soon" note
    // instead of a broken link.
    email: '[ORDER EMAIL — add in src/config/site.ts]',
    instagram: 'https://instagram.com/sugarmamasweetss',
    facebook: 'https://facebook.com/sugarmamasweetss',
    /** Display handles (so we don't have to parse them out of the URLs). */
    instagramHandle: '@sugarmamasweetss',
    facebookHandle: 'sugarmamasweetss',
    /** Optional — leave '' to hide. Used for a tappable "text/call" button. */
    phone: '',
  },

  // --------------------------------------------------------------------------
  //  ORDERING INFO  (shown on the contact page; also feeds the JSON-LD)
  // --------------------------------------------------------------------------
  ordering: {
    // TODO: confirm how far ahead customers should order.
    leadTime: '[Please order at least 2 weeks ahead — TODO: confirm lead time]',
    // TODO: confirm pickup / delivery details.
    fulfillment: '[Local pickup in the Scottsboro area — TODO: confirm delivery options]',
  },

  // --------------------------------------------------------------------------
  //  HOME PAGE
  // --------------------------------------------------------------------------
  home: {
    /**
     * HERO photo — the first thing visitors see.
     * Use her signature original work (soft blush / cream / bow / monogram,
     * baby-shower style). Portrait orientation (~4:5, tall) looks best.
     * Do NOT use a licensed-IP design here.
     */
    heroImage: {
      src: 'hero.jpg',
      alt: 'A blush-and-cream bridal shower cookie set with pink bows, monogram cookies, and engagement-ring designs',
    },

    /** Button under the hero that points people toward ordering. */
    heroCtaLabel: 'Start a custom order',

    bio: {
      /** Section heading for the "Meet Leslie" block. */
      heading: 'Meet Leslie',
      portraitImage: {
        src: 'portrait.jpg',
        alt: 'Leslie Lewis, the baker behind Sugar Mama Sweets, with her family',
      },
      /** Each string is its own paragraph. */
      paragraphs: [
        "Hi, I'm Leslie Lewis, the baker behind Sugar Mama Sweets. From my home bakery in " +
          "Scottsboro, Alabama, I create custom sugar cookies designed to make life's special " +
          'moments even sweeter.',
        "Whether you're celebrating a birthday, baby shower, wedding, holiday, or just because, " +
          'each cookie is baked from scratch, decorated by hand, and made especially for your ' +
          "event. No two orders are exactly alike, and that's what makes them special.",
        "I'd love to help bring your vision to life and create something sweet for your next " +
          'celebration.',
      ],
    },

    /** Heading for the "Known for" block (uses site.knownFor above). */
    knownForHeading: 'Known for',

    /** Heading for the 3–4 photo teaser strip that links to the gallery. */
    teaserHeading: 'A little taste of my work',
    teaserCtaLabel: 'See the full gallery',
    /**
     * Filenames for the 3–4 teaser photos. Use her best signature-style work.
     * These should also exist in the gallery list below.
     */
    teaserImages: [
      { src: 'teaser-1.jpg', alt: 'Ballerina-themed birthday cookies in soft pink — tutus, ballet slippers, and name plaques' },
      // Note: teaser-2 is a licensed-character (Winnie the Pooh) set. Kept here
      // intentionally per owner's decision. Flagged `licensedIp` for the record;
      // revisit if the brand grows and IP exposure becomes a concern.
      { src: 'teaser-2.jpg', alt: 'Pastel pink-and-yellow baby-shower cookies with honey-pot and bear designs', licensedIp: true },
      { src: 'teaser-3.jpg', alt: 'Class of 2026 graduation cookies in pink and gold with caps, diplomas, and flowers' },
      { src: 'teaser-4.jpg', alt: 'Bright bachelorette “last splash” cookies with a flamingo float, heart sunglasses, and beach designs' },
    ] as GalleryPhoto[],
  },

  // --------------------------------------------------------------------------
  //  GALLERY PAGE
  //  Lead with signature blush/baby-shower style, then show range.
  //  Add or remove entries freely — just keep `src` + `alt` filled in.
  // --------------------------------------------------------------------------
  gallery: {
    heading: 'The Gallery',
    intro:
      'A collection of custom sets made for showers, birthdays, weddings, and everything ' +
      "sweet in between. Don't see your theme? I'd love a new challenge.",
    photos: [
      // --- Signature blush / baby-shower style first (the face of the brand) ---
      { src: 'gallery-01.jpg', alt: 'Blush and cream baby-shower cookies with hand-tied bow details' },
      { src: 'gallery-02.jpg', alt: 'Monogrammed sugar cookies in soft pink with gold accents' },
      { src: 'gallery-03.jpg', alt: 'Christening set in ivory with delicate piped lace' },
      { src: 'gallery-04.jpg', alt: 'Pastel floral cookies for a spring bridal shower' },
      { src: 'gallery-05.jpg', alt: 'Dusty-rose birthday cookies with hand-painted roses' },
      { src: 'gallery-06.jpg', alt: 'Elegant wedding cookies in white and gold' },
      // --- A few showing range (different occasions / styles) ---
      { src: 'gallery-07.jpg', alt: 'Bright, playful birthday cookies for a child’s party' },
      { src: 'gallery-08.jpg', alt: 'Autumn-themed cookies in warm amber and cream' },
      { src: 'gallery-09.jpg', alt: 'Holiday cookies with classic red and green piping' },
      // TODO: Licensed-IP photos (sports logos, characters, branded designs) are
      // intentionally kept to a small minority here and are NEVER used as the hero
      // or share image. Mark any such photo with `licensedIp: true` so it can be
      // filtered out of prominent slots. Example:
      // { src: 'gallery-10.jpg', alt: 'Themed character cookies', licensedIp: true },
    ] as GalleryPhoto[],
  },

  // --------------------------------------------------------------------------
  //  CONTACT / ORDER PAGE
  // --------------------------------------------------------------------------
  contactPage: {
    heading: "Let's make something sweet",
    intro:
      'Every order is custom and decorated by hand, so the first step is just to say hello. ' +
      "Here's how ordering works.",
    /** "How to order" steps. Each item shows as its own numbered card. */
    howToOrder: [
      {
        title: 'Reach out',
        body: 'Send me a message on Instagram, Facebook, or email with the celebration you have in mind.',
      },
      {
        title: 'Share your vision',
        body: 'Tell me the occasion, your date, colors, theme, and roughly how many cookies you’d like. Inspiration photos are always welcome.',
      },
      {
        title: 'Hand-decorated, just for you',
        body: 'Once the details are set, I hand-decorate your cookies fresh from my Scottsboro kitchen — so no two sets are ever quite the same.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  //  EMAIL SIGNUP  (copy shown on the form)
  // --------------------------------------------------------------------------
  signup: {
    heading: 'Join the list',
    body: 'Join the list for new designs and open order slots.',
    buttonLabel: 'Join the list',
    placeholder: 'you@example.com',
    successMessage: 'You’re on the list — thanks so much! 🍪',
    errorMessage: 'Hmm, that didn’t work. Please try again in a moment.',
  },

  // --------------------------------------------------------------------------
  //  SHARING  (the image that shows when a link is posted to FB / IG / texts)
  //  MUST be an original signature design — never a licensed-IP photo.
  // --------------------------------------------------------------------------
  share: {
    /** File name inside src/assets/. Use her single best signature photo. */
    ogImage: 'og-default.jpg',
  },
} as const;

export type Site = typeof site;

/**
 * Helper: is this config value an unfilled [BRACKETED] placeholder?
 * Used by the UI to render a clearly-labeled "coming soon" note instead of a
 * broken link for TODO values (e.g. the order email before it's set).
 */
export function isPlaceholder(value: string): boolean {
  return /\[.*\]/.test(value);
}
