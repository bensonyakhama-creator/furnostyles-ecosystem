# Furnostyles Reusable Forms and Lead-Capture Architecture

**Date:** 2026-05-22 | **Status:** Planning

---

## 1. Contact Form Architecture

Every public page on Furnostyles should make it easy for a visitor to become a lead. The contact form is the simplest and most important conversion tool.

### Contact Form Structure

```html
<!-- Contact page form -->
<section class="fns-section fns-section--cta" id="contact">
  <div class="fns-container">
    <h2>Get in Touch</h2>
    <p>Have a question or ready to start your project? Send us a message.</p>

    <form class="fns-form fns-form--contact" action="#" method="POST" novalidate data-form-type="contact">
      <div class="fns-form__row fns-form__row--2">
        <div class="fns-form__field">
          <label for="contact-name">Full Name <span aria-label="required">*</span></label>
          <input type="text" id="contact-name" name="name" required
                 autocomplete="name" aria-describedby="contact-name-error">
          <span class="fns-form__error" id="contact-name-error" role="alert" hidden>
            Please enter your full name.
          </span>
        </div>
        <div class="fns-form__field">
          <label for="contact-phone">Phone Number <span aria-label="required">*</span></label>
          <input type="tel" id="contact-phone" name="phone" required
                 autocomplete="tel" inputmode="tel" aria-describedby="contact-phone-error">
          <span class="fns-form__error" id="contact-phone-error" role="alert" hidden>
            Please enter a valid phone number.
          </span>
        </div>
      </div>

      <div class="fns-form__field">
        <label for="contact-email">Email Address</label>
        <input type="email" id="contact-email" name="email"
               autocomplete="email" inputmode="email"
               aria-describedby="contact-email-error">
        <span class="fns-form__error" id="contact-email-error" role="alert" hidden>
          Please enter a valid email address.
        </span>
      </div>

      <div class="fns-form__field">
        <label for="contact-subject">Subject <span aria-label="required">*</span></label>
        <select id="contact-subject" name="subject" required aria-describedby="contact-subject-error">
          <option value="" disabled selected>Select a subject...</option>
          <option value="general">General Inquiry</option>
          <option value="interior-design">Interior Design</option>
          <option value="house-finishing">House Finishing</option>
          <option value="furniture-repairs">Furniture & Repairs</option>
          <option value="quote">Request a Quote</option>
        </select>
        <span class="fns-form__error" id="contact-subject-error" role="alert" hidden>
          Please select a subject.
        </span>
      </div>

      <div class="fns-form__field">
        <label for="contact-message">Message <span aria-label="required">*</span></label>
        <textarea id="contact-message" name="message" rows="5" required
                  aria-describedby="contact-message-error"></textarea>
        <span class="fns-form__error" id="contact-message-error" role="alert" hidden>
          Please enter a message.
        </span>
      </div>

      <div class="fns-form__field">
        <label class="fns-form__check">
          <input type="checkbox" name="consent" required
                 aria-describedby="contact-consent-error">
          <span>I agree to be contacted about my inquiry. <a href="privacy.html">Privacy Policy</a>.</span>
        </label>
        <span class="fns-form__error" id="contact-consent-error" role="alert" hidden>
          You must agree to be contacted.
        </span>
      </div>

      <button type="submit" class="fns-btn fns-btn--primary fns-btn--large">
        Send Message
      </button>

      <div class="fns-form__status" role="status" aria-live="polite" hidden>
        <p class="fns-form__success" hidden>Thank you! We will contact you within 24 hours.</p>
        <p class="fns-form__error--global" hidden>Something went wrong. Please try again.</p>
      </div>
    </form>
  </div>
</section>
```

### Contact Form Rules

| Rule | Requirement |
|------|-------------|
| Name, phone, and message are required. | Minimum viable lead capture. |
| Email is optional but validated if provided. | Kenyan clients often prefer phone contact. |
| Subject dropdown routes the lead correctly. | Interior design leads go to the design team, etc. |
| Consent checkbox is required. | GDPR/compliance. |
| Privacy policy is linked next to the consent checkbox. | Transparency. |
| Form has a clear heading and supporting text. | Context before the form fields. |
| Submit button is large, visible, and action-oriented. | "Send Message" not "Submit". |
| Success message appears within the form area. | Users see confirmation without scrolling. |

---

## 2. Quote-Request Form Strategy

A quote request is a higher-intent lead than a general contact. It asks for more detail so the team can provide an accurate estimate.

### Quote-Request Form Structure

```html
<form class="fns-form fns-form--quote" action="#" method="POST" novalidate data-form-type="quote-request">
  <fieldset class="fns-form__fieldset">
    <legend>Your Details</legend>
    <div class="fns-form__row fns-form__row--2">
      <div class="fns-form__field">
        <label for="quote-name">Full Name <span aria-label="required">*</span></label>
        <input type="text" id="quote-name" name="name" required autocomplete="name">
      </div>
      <div class="fns-form__field">
        <label for="quote-phone">Phone Number <span aria-label="required">*</span></label>
        <input type="tel" id="quote-phone" name="phone" required autocomplete="tel" inputmode="tel">
      </div>
    </div>
    <div class="fns-form__field">
      <label for="quote-email">Email Address</label>
      <input type="email" id="quote-email" name="email" autocomplete="email" inputmode="email">
    </div>
    <div class="fns-form__field">
      <label for="quote-location">Location / Area in Nairobi <span aria-label="required">*</span></label>
      <input type="text" id="quote-location" name="location" required
             placeholder="e.g., Lavington, Karen, Westlands">
    </div>
  </fieldset>

  <fieldset class="fns-form__fieldset">
    <legend>Project Details</legend>
    <div class="fns-form__field">
      <label for="quote-service">Service Needed <span aria-label="required">*</span></label>
      <select id="quote-service" name="service" required>
        <option value="" disabled selected>Select a service...</option>
        <option value="interior-design">Interior Design</option>
        <option value="house-finishing">House Finishing</option>
        <option value="furniture-repairs">Furniture & Repairs</option>
        <option value="multiple">Multiple Services</option>
      </select>
    </div>
    <div class="fns-form__field">
      <label for="quote-property">Property Type</label>
      <select id="quote-property" name="property_type">
        <option value="" selected>Select property type...</option>
        <option value="apartment">Apartment</option>
        <option value="townhouse">Townhouse</option>
        <option value="standalone">Standalone House</option>
        <option value="office">Office / Commercial</option>
      </select>
    </div>
    <div class="fns-form__field">
      <label for="quote-budget">Estimated Budget (KES)</label>
      <select id="quote-budget" name="budget">
        <option value="" selected>Select budget range...</option>
        <option value="under-100k">Under KES 100,000</option>
        <option value="100k-500k">KES 100,000 - 500,000</option>
        <option value="500k-1m">KES 500,000 - 1,000,000</option>
        <option value="1m-3m">KES 1,000,000 - 3,000,000</option>
        <option value="over-3m">Over KES 3,000,000</option>
      </select>
    </div>
    <div class="fns-form__field">
      <label for="quote-description">Describe Your Project <span aria-label="required">*</span></label>
      <textarea id="quote-description" name="description" rows="6" required
                placeholder="Tell us about the rooms, style preferences, timeline..."></textarea>
    </div>
  </fieldset>

  <fieldset class="fns-form__fieldset">
    <legend>Availability</legend>
    <div class="fns-form__field">
      <label for="quote-timeline">Preferred Start Date</label>
      <input type="date" id="quote-timeline" name="timeline">
    </div>
    <div class="fns-form__field">
      <label class="fns-form__check">
        <input type="checkbox" name="site_visit" value="yes">
        <span>I am available for a site visit</span>
      </label>
    </div>
  </fieldset>

  <div class="fns-form__field">
    <label class="fns-form__check">
      <input type="checkbox" name="consent" required>
      <span>I agree to be contacted about my quote request. <a href="privacy.html">Privacy Policy</a>.</span>
    </label>
  </div>

  <button type="submit" class="fns-btn fns-btn--primary fns-btn--large">
    Request Your Free Quote
  </button>
</form>
```

### Quote-Request Form Rules

| Rule | Requirement |
|------|-------------|
| Form is grouped into logical fieldsets. | "Your Details", "Project Details", "Availability". |
| Budget is captured as a range, not a precise number. | Reduces friction; clients may not know exact budgets. |
| Property type helps the team prepare. | Apartment vs. standalone house requires different approaches. |
| Site visit checkbox pre-qualifies serious leads. | Indicates readiness to proceed. |
| Preferred start date is optional. | Not all clients have a specific timeline. |
| Form is accessible from every service page. | Contextual quote requests convert higher than generic contact. |

---

## 3. Service Inquiry Workflow

Each service page should have its own inquiry path, tailored to that service's typical client needs.

### Service Inquiry Form Pattern

```html
<!-- On services/interior-design.html -->
<section class="fns-section fns-section--cta" id="inquiry">
  <div class="fns-container">
    <h2>Start Your Interior Design Project</h2>
    <p>Request a consultation and we'll help you create the space you've always wanted.</p>

    <form class="fns-form fns-form--service" action="#" method="POST" novalidate
          data-form-type="service-inquiry" data-service="interior-design">
      <div class="fns-form__row fns-form__row--2">
        <div class="fns-form__field">
          <label for="inquiry-name">Full Name <span aria-label="required">*</span></label>
          <input type="text" id="inquiry-name" name="name" required autocomplete="name">
        </div>
        <div class="fns-form__field">
          <label for="inquiry-phone">Phone <span aria-label="required">*</span></label>
          <input type="tel" id="inquiry-phone" name="phone" required autocomplete="tel" inputmode="tel">
        </div>
      </div>

      <div class="fns-form__field">
        <label for="inquiry-rooms">Which rooms need design? <span aria-label="required">*</span></label>
        <div class="fns-form__checks">
          <label class="fns-form__check"><input type="checkbox" name="rooms" value="living"> Living Room</label>
          <label class="fns-form__check"><input type="checkbox" name="rooms" value="kitchen"> Kitchen</label>
          <label class="fns-form__check"><input type="checkbox" name="rooms" value="bedroom"> Bedroom</label>
          <label class="fns-form__check"><input type="checkbox" name="rooms" value="bathroom"> Bathroom</label>
          <label class="fns-form__check"><input type="checkbox" name="rooms" value="office"> Home Office</label>
          <label class="fns-form__check"><input type="checkbox" name="rooms" value="other"> Other</label>
        </div>
      </div>

      <div class="fns-form__field">
        <label for="inquiry-style">Preferred Style</label>
        <select id="inquiry-style" name="style">
          <option value="" selected>Select a style...</option>
          <option value="modern">Modern / Contemporary</option>
          <option value="classic">Classic / Traditional</option>
          <option value="minimalist">Minimalist</option>
          <option value="rustic">Rustic / Industrial</option>
          <option value="luxury">Luxury / High-end</option>
          <option value="unsure">Not Sure — Need Guidance</option>
        </select>
      </div>

      <div class="fns-form__field">
        <label for="inquiry-message">Additional Details</label>
        <textarea id="inquiry-message" name="message" rows="4"
                  placeholder="Any specific requirements, timeline, or inspiration..."></textarea>
      </div>

      <div class="fns-form__field">
        <label class="fns-form__check">
          <input type="checkbox" name="consent" required>
          <span>I agree to be contacted. <a href="privacy.html">Privacy Policy</a>.</span>
        </label>
      </div>

      <button type="submit" class="fns-btn fns-btn--primary fns-btn--large">
        Request Interior Design Consultation
      </button>
    </form>
  </div>
</section>
```

### Service Inquiry Rules

| Rule | Requirement |
|------|-------------|
| Each service page has a contextual inquiry form. | Interior design asks about rooms; house finishing asks about property type. |
| Form heading mentions the specific service. | "Start Your Interior Design Project" not "Contact Us". |
| `data-form-type` and `data-service` attributes identify the lead source. | Analytics and routing. |
| Room/style checkboxes are tailored to the service. | Relevant fields increase completion rates. |
| Form is placed at the bottom of the service page, after all content. | Users read about the service before inquiring. |

---

## 4. Portfolio Inquiry Workflow

Portfolio project pages convert browsers into leads by showing proof of work, then making it easy to start a similar project.

### Portfolio Inquiry Pattern

```html
<!-- On portfolio/project-slug.html -->
<section class="fns-section fns-section--cta" id="inquire">
  <div class="fns-container">
    <h2>Love This Project? Let's Create Something Similar</h2>
    <p>Tell us about your space and we'll help you achieve a look like this.</p>

    <form class="fns-form fns-form--portfolio" action="#" method="POST" novalidate
          data-form-type="portfolio-inquiry" data-project="lavington-penthouse">
      <div class="fns-form__row fns-form__row--2">
        <div class="fns-form__field">
          <label for="portfolio-name">Full Name <span aria-label="required">*</span></label>
          <input type="text" id="portfolio-name" name="name" required autocomplete="name">
        </div>
        <div class="fns-form__field">
          <label for="portfolio-phone">Phone <span aria-label="required">*</span></label>
          <input type="tel" id="portfolio-phone" name="phone" required autocomplete="tel" inputmode="tel">
        </div>
      </div>

      <div class="fns-form__field">
        <label for="portfolio-interest">I'm interested in:</label>
        <select id="portfolio-interest" name="interest">
          <option value="similar-project">A project just like this</option>
          <option value="same-service">The same service for my space</option>
          <option value="consultation">A general consultation</option>
        </select>
      </div>

      <div class="fns-form__field">
        <label for="portfolio-message">Tell us about your project</label>
        <textarea id="portfolio-message" name="message" rows="4"
                  placeholder="What space do you have in mind? Any specific requirements?"></textarea>
      </div>

      <div class="fns-form__field">
        <label class="fns-form__check">
          <input type="checkbox" name="consent" required>
          <span>I agree to be contacted. <a href="privacy.html">Privacy Policy</a>.</span>
        </label>
      </div>

      <button type="submit" class="fns-btn fns-btn--primary fns-btn--large">
        Start Your Project
      </button>
    </form>
  </div>
</section>
```

### Portfolio Inquiry Rules

| Rule | Requirement |
|------|-------------|
| Portfolio inquiry form references the specific project. | "Love This Project? Let's Create Something Similar". |
| `data-project` attribute captures which project generated the lead. | Analytics: which projects convert best? |
| Interest dropdown lets users specify their intent. | "Same project" vs. "same service" vs. "consultation". |
| Form is placed after project images and description. | Users see the work before being asked to inquire. |
| Previous/next project navigation is above the inquiry form. | Users can browse more projects before committing. |

---

## 5. Future Marketplace Inquiry Workflow

**Not to be built yet.** Document only.

When the marketplace launches, product inquiries will be a primary lead source for vendors and the Furnostyles team.

```html
<!-- Future marketplace product inquiry -->
<form class="fns-form fns-form--product" action="#" method="POST" novalidate
      data-form-type="product-inquiry" data-product-id="prod-12345">
  <div class="fns-form__row fns-form__row--2">
    <div class="fns-form__field">
      <label for="product-inquiry-name">Your Name <span aria-label="required">*</span></label>
      <input type="text" id="product-inquiry-name" name="name" required>
    </div>
    <div class="fns-form__field">
      <label for="product-inquiry-phone">Phone <span aria-label="required">*</span></label>
      <input type="tel" id="product-inquiry-phone" name="phone" required inputmode="tel">
    </div>
  </div>

  <div class="fns-form__field">
    <label for="product-inquiry-quantity">Quantity Needed</label>
    <input type="number" id="product-inquiry-quantity" name="quantity" min="1" value="1">
  </div>

  <div class="fns-form__field">
    <label for="product-inquiry-message">Questions or Requirements</label>
    <textarea id="product-inquiry-message" name="message" rows="3"
              placeholder="Any questions about delivery, installation, or customisation..."></textarea>
  </div>

  <button type="submit" class="fns-btn fns-btn--primary">
    Ask About This Product
  </button>
</form>
```

### Marketplace Inquiry Rules (Future)

| Rule | Requirement |
|------|-------------|
| Product inquiry form is lightweight (4-5 fields max). | Low friction for quick questions. |
| `data-product-id` captures the exact product. | Vendor receives product context. |
| Quantity field pre-filled with 1. | Most common scenario; users can adjust. |
| Inquiry is routed to the vendor, not just Furnostyles. | Marketplace model: vendor owns the sale. |
| Inquiry includes product name and URL in the notification. | Vendor knows exactly which product the customer is asking about. |

---

## 6. Future Vendor Application Forms

**Not to be built yet.** Document only.

When the marketplace launches, vendors will apply to sell on Furnostyles.

```html
<!-- Future vendor application -->
<form class="fns-form fns-form--vendor" action="#" method="POST" novalidate
      data-form-type="vendor-application">
  <fieldset class="fns-form__fieldset">
    <legend>Business Information</legend>
    <div class="fns-form__field">
      <label for="vendor-business">Business Name <span aria-label="required">*</span></label>
      <input type="text" id="vendor-business" name="business_name" required>
    </div>
    <div class="fns-form__field">
      <label for="vendor-type">Business Type <span aria-label="required">*</span></label>
      <select id="vendor-type" name="business_type" required>
        <option value="" disabled selected>Select type...</option>
        <option value="manufacturer">Manufacturer</option>
        <option value="distributor">Distributor</option>
        <option value="retailer">Retailer</option>
        <option value="contractor">Contractor / Service Provider</option>
      </select>
    </div>
    <div class="fns-form__field">
      <label for="vendor-categories">Product / Service Categories <span aria-label="required">*</span></label>
      <div class="fns-form__checks">
        <label class="fns-form__check"><input type="checkbox" name="categories" value="flooring"> Flooring</label>
        <label class="fns-form__check"><input type="checkbox" name="categories" value="lighting"> Lighting</label>
        <label class="fns-form__check"><input type="checkbox" name="categories" value="kitchen"> Kitchen & Bath</label>
        <label class="fns-form__check"><input type="checkbox" name="categories" value="furniture"> Furniture</label>
      </div>
    </div>
  </fieldset>

  <fieldset class="fns-form__fieldset">
    <legend>Contact Person</legend>
    <div class="fns-form__row fns-form__row--2">
      <div class="fns-form__field">
        <label for="vendor-contact-name">Contact Name <span aria-label="required">*</span></label>
        <input type="text" id="vendor-contact-name" name="contact_name" required>
      </div>
      <div class="fns-form__field">
        <label for="vendor-contact-phone">Phone <span aria-label="required">*</span></label>
        <input type="tel" id="vendor-contact-phone" name="contact_phone" required inputmode="tel">
      </div>
    </div>
    <div class="fns-form__field">
      <label for="vendor-contact-email">Email <span aria-label="required">*</span></label>
      <input type="email" id="vendor-contact-email" name="contact_email" required inputmode="email">
    </div>
  </fieldset>

  <div class="fns-form__field">
    <label class="fns-form__check">
      <input type="checkbox" name="terms" required>
      <span>I agree to the <a href="vendor-terms.html">Vendor Terms and Conditions</a>.</span>
    </label>
  </div>

  <button type="submit" class="fns-btn fns-btn--primary fns-btn--large">
    Apply to Become a Vendor
  </button>
</form>
```

### Vendor Application Rules (Future)

| Rule | Requirement |
|------|-------------|
| Application captures business and contact info separately. | Two fieldsets for clarity. |
| Category checkboxes help route the application. | Flooring vendors go to the flooring team for review. |
| Terms and conditions must be agreed to. | Legal protection. |
| Application status is communicated via email and SMS. | Vendors know what to expect. |
| Application is reviewed before vendor dashboard access is granted. | Quality control for the marketplace. |

---

## 7. Future Client Onboarding Forms

**Not to be built yet.** Document only.

After a lead converts to a client, onboarding forms collect the details needed to start the project.

```html
<!-- Future client onboarding -->
<form class="fns-form fns-form--onboarding" action="#" method="POST" novalidate
      data-form-type="client-onboarding" data-client-id="client-123">
  <fieldset class="fns-form__fieldset">
    <legend>Project Brief</legend>
    <div class="fns-form__field">
      <label for="onboarding-address">Property Address <span aria-label="required">*</span></label>
      <textarea id="onboarding-address" name="property_address" rows="2" required
                placeholder="Full address in Nairobi..."></textarea>
    </div>
    <div class="fns-form__field">
      <label for="onboarding-size">Approximate Property Size</label>
      <select id="onboarding-size" name="property_size">
        <option value="" selected>Select size...</option>
        <option value="under-100">Under 100 sqm</option>
        <option value="100-200">100 - 200 sqm</option>
        <option value="200-400">200 - 400 sqm</option>
        <option value="over-400">Over 400 sqm</option>
      </select>
    </div>
    <div class="fns-form__field">
      <label for="onboarding-occupancy">Current Occupancy Status</label>
      <select id="onboarding-occupancy" name="occupancy">
        <option value="occupied">Currently Occupied</option>
        <option value="vacant">Vacant / New Property</option>
        <option value="renovating">Under Renovation</option>
      </select>
    </div>
  </fieldset>

  <fieldset class="fns-form__fieldset">
    <legend>Design Preferences</legend>
    <div class="fns-form__field">
      <label for="onboarding-moodboard">Upload Inspiration Images (optional)</label>
      <input type="file" id="onboarding-moodboard" name="moodboard" accept="image/*" multiple
             aria-describedby="onboarding-moodboard-help">
      <p class="fns-form__help" id="onboarding-moodboard-help">
        Max 5 images, each under 5MB. JPEG or PNG.
      </p>
    </div>
    <div class="fns-form__field">
      <label for="onboarding-notes">Additional Notes</label>
      <textarea id="onboarding-notes" name="notes" rows="4"
                placeholder="Specific requirements, family needs, accessibility concerns..."></textarea>
    </div>
  </fieldset>

  <button type="submit" class="fns-btn fns-btn--primary fns-btn--large">
    Submit Project Brief
  </button>
</form>
```

### Client Onboarding Rules (Future)

| Rule | Requirement |
|------|-------------|
| Onboarding is a multi-step or multi-fieldset form. | Breaks a long form into digestible sections. |
| Property details are captured before design preferences. | Address and size are needed for logistics. |
| File upload is optional and clearly limited. | "Max 5 images, each under 5MB". |
| Help text explains file upload constraints. | Prevents user errors. |
| Form auto-saves progress (future enhancement). | Clients do not lose work if they navigate away. |

---

## 8. Future Booking/Request Systems

**Not to be built yet.** Document only.

Booking systems allow clients to schedule consultations, site visits, or showroom appointments.

```html
<!-- Future booking form -->
<form class="fns-form fns-form--booking" action="#" method="POST" novalidate
      data-form-type="booking" data-booking-type="consultation">
  <div class="fns-form__row fns-form__row--2">
    <div class="fns-form__field">
      <label for="booking-name">Full Name <span aria-label="required">*</span></label>
      <input type="text" id="booking-name" name="name" required autocomplete="name">
    </div>
    <div class="fns-form__field">
      <label for="booking-phone">Phone <span aria-label="required">*</span></label>
      <input type="tel" id="booking-phone" name="phone" required autocomplete="tel" inputmode="tel">
    </div>
  </div>

  <div class="fns-form__field">
    <label for="booking-type">Appointment Type <span aria-label="required">*</span></label>
    <select id="booking-type" name="appointment_type" required>
      <option value="consultation">Design Consultation</option>
      <option value="site-visit">Site Visit</option>
      <option value="showroom">Showroom Visit</option>
    </select>
  </div>

  <div class="fns-form__row fns-form__row--2">
    <div class="fns-form__field">
      <label for="booking-date">Preferred Date <span aria-label="required">*</span></label>
      <input type="date" id="booking-date" name="preferred_date" required>
    </div>
    <div class="fns-form__field">
      <label for="booking-time">Preferred Time</label>
      <select id="booking-time" name="preferred_time">
        <option value="morning">Morning (9:00 - 12:00)</option>
        <option value="afternoon">Afternoon (12:00 - 17:00)</option>
        <option value="evening">Evening (17:00 - 19:00)</option>
      </select>
    </div>
  </div>

  <div class="fns-form__field">
    <label for="booking-notes">Notes</label>
    <textarea id="booking-notes" name="notes" rows="3"
              placeholder="Any specific requirements or questions..."></textarea>
  </div>

  <button type="submit" class="fns-btn fns-btn--primary fns-btn--large">
    Request Appointment
  </button>
</form>
```

### Booking System Rules (Future)

| Rule | Requirement |
|------|-------------|
| Date picker restricts to business days. | No Sunday or public holiday bookings. |
| Time slots are shown, not free-form time input. | Easier to manage availability. |
| Confirmation is sent via email and SMS. | Users know their booking is received. |
| Booking status is trackable (pending, confirmed, completed, cancelled). | Transparency for the client. |
| Calendar integration (future) syncs with team schedules. | Prevents double-booking. |

---

## 9. Form Validation Standards

All forms use client-side validation for immediate feedback, with server-side validation as a backup (when server functionality is available).

### Validation Approach

```javascript
// assets/js/form-validation.js (future centralized validation)

const FurnostylesValidation = {
  rules: {
    name: {
      required: true,
      minLength: 2,
      pattern: /^[\p{L}\s'-]+$/u,
      message: 'Please enter a valid name (at least 2 characters).'
    },
    phone: {
      required: true,
      pattern: /^(?:\+254|0)[17]\d{8}$/,
      message: 'Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678).'
    },
    email: {
      required: false,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address.'
    },
    message: {
      required: true,
      minLength: 10,
      message: 'Please enter a message (at least 10 characters).'
    }
  },

  validateField(field, ruleName) {
    const rule = this.rules[ruleName];
    const value = field.value.trim();
    const errorEl = document.getElementById(field.getAttribute('aria-describedby'));

    // Required check
    if (rule.required && !value) {
      this.showError(field, errorEl, 'This field is required.');
      return false;
    }

    // Skip further checks if optional and empty
    if (!rule.required && !value) {
      this.clearError(field, errorEl);
      return true;
    }

    // Min length
    if (rule.minLength && value.length < rule.minLength) {
      this.showError(field, errorEl, rule.message);
      return false;
    }

    // Pattern
    if (rule.pattern && !rule.pattern.test(value)) {
      this.showError(field, errorEl, rule.message);
      return false;
    }

    this.clearError(field, errorEl);
    return true;
  },

  showError(field, errorEl, message) {
    field.setAttribute('aria-invalid', 'true');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
  },

  clearError(field, errorEl) {
    field.removeAttribute('aria-invalid');
    if (errorEl) {
      errorEl.hidden = true;
    }
  }
};
```

### Validation Rules

| Rule | Requirement |
|------|-------------|
| Validate on `blur` (when user leaves a field). | Immediate feedback without being intrusive. |
| Re-validate on `input` after an error is shown. | Error clears as soon as the user fixes it. |
| Validate all fields on form submit. | Catch any missed fields before submission. |
| First invalid field receives focus on submit. | Keyboard users know where to fix. |
| Error messages are specific and actionable. | "Please enter a valid phone number" not "Invalid input". |
| Error messages use `role="alert"` and `aria-describedby`. | Screen readers announce errors. |
| Invalid fields have `aria-invalid="true"`. | Screen readers know the field is in error. |
| Never use browser default validation tooltips. | Inconsistent appearance across browsers. |
| `novalidate` attribute on all `<form>` elements. | Disables browser validation; use custom JS instead. |

---

## 10. Form UX Best Practices

### UX Principles

| Principle | Implementation |
|-----------|----------------|
| **Label every input** | Every `<input>`, `<select>`, and `<textarea>` has an associated `<label>`. |
| **Placeholder as hint, not label** | Placeholders show format examples; labels describe the field. |
| **Group related fields** | Fieldsets with legends visually and semantically group sections. |
| **One column on mobile** | All fields stack vertically on screens < 768px. |
| **Two columns on desktop** | Name/phone, date/time pairs sit side by side. |
| **Tab order is logical** | Fields follow visual order; no jumping around. |
| **No hidden required fields** | All required fields are visible without scrolling. |
| **Progress indication (long forms)** | "Step 2 of 3" for multi-step forms. |
| **Auto-fill support** | `autocomplete` attributes help browsers pre-fill. |
| **Help text for complex fields** | Brief explanation below the field, not inside the label. |

### Form UX Rules

| Rule | Requirement |
|------|-------------|
| Labels are placed above the input, not to the left. | Scannable, mobile-friendly. |
| Required fields are marked with `*` and `aria-label="required"`. | Visible and accessible indication. |
| Optional fields are not marked. | Only exceptions get attention. |
| Select dropdowns have a disabled placeholder option. | Forces user to make a choice. |
| Textareas have a sensible default height (4-6 rows). | Not too small, not overwhelming. |
| Form width is constrained (max 800px). | Wide forms are hard to scan. |
| Submit button is at the bottom, left-aligned. | Natural reading flow ends at the button. |
| Form has a clear visual container. | Background colour or border separates it from page content. |

---

## 11. Mobile-Friendly Form Standards

### Mobile Form Adjustments

| Desktop Behaviour | Mobile Behaviour |
|-------------------|------------------|
| Two-column layout (`fns-form__row--2`) | Single column, full width |
| Labels above inputs | Labels above inputs (same) |
| Checkbox groups in rows | Checkbox groups in a single column |
| Date picker uses native HTML5 `type="date"` | Native mobile date picker (iOS/Android) |
| Phone input uses `inputmode="tel"` | Numeric keyboard appears |
| Email input uses `inputmode="email"` | Email keyboard with @ and .com |

### Mobile Form Rules

| Rule | Requirement |
|------|-------------|
| Touch targets are minimum 44x44px. | Easy tapping on small screens. |
| Form fields use 16px font size minimum. | Prevents iOS zoom on focus. |
| Select dropdowns use native mobile picker. | Better UX than custom dropdowns on mobile. |
| Form padding increases on mobile. | Comfortable spacing for thumbs. |
| Submit button is full-width on mobile. | Easy to tap with thumb. |
| No horizontal scrolling inside the form. | All fields fit within the viewport. |
| Error messages appear below the field on mobile. | Same as desktop, but with more padding. |
| Keyboard does not cover the active field. | Scroll field into view when focused. |

---

## 12. CTA/Button Standards

Every form ends with a clear, action-oriented button. Buttons are styled in `style.css` and never redefined per page.

### Button Hierarchy

| Button Type | Class | Use Case |
|-------------|-------|----------|
| **Primary** | `.fns-btn--primary` | Main form submit, primary CTA |
| **Secondary** | `.fns-btn--secondary` | Alternative action, "Save for later" |
| **Ghost** | `.fns-btn--ghost` | Card links, "Learn more" inside grids |
| **Large** | `.fns-btn--large` | Form submit buttons |
| **Small** | `.fns-btn--small` | Inline actions, filter buttons |

### Button Example

```html
<!-- Primary form submit -->
<button type="submit" class="fns-btn fns-btn--primary fns-btn--large">
  Request Your Free Quote
</button>

<!-- Secondary action -->
<button type="button" class="fns-btn fns-btn--secondary">
  Save Draft
</button>

<!-- Ghost link inside a card -->
<a href="services/interior-design.html" class="fns-btn fns-btn--ghost">
  Learn More
</a>
```

### Button Rules

| Rule | Requirement |
|------|-------------|
| Primary buttons use the brand accent colour (gold/copper). | Stand out visually. |
| Submit buttons use `<button type="submit">`, not `<a>`. | Semantic HTML, keyboard accessible. |
| Button text is specific to the action. | "Request Your Free Quote" not "Submit". |
| Disabled state is visually distinct and announced. | `aria-disabled="true"` + greyed-out styling. |
| Loading state shows a spinner and disables the button. | Prevents double-submission. |
| Buttons have consistent padding, border-radius, and font size. | Defined once in `style.css`. |
| Hover and focus states are clearly visible. | 2px outline or background colour change. |
| No `!important` in button CSS. | Modifiers should override cleanly. |

---

## 13. Success/Error Message Standards

Form feedback must be clear, immediate, and accessible.

### Success State

```html
<div class="fns-form__status" role="status" aria-live="polite" hidden>
  <div class="fns-form__success">
    <h3>Thank You!</h3>
    <p>Your message has been sent. We will contact you within 24 hours.</p>
    <p>In the meantime, explore our <a href="portfolio/index.html">portfolio</a> or read our <a href="blogs/index.html">blog</a>.</p>
  </div>
</div>
```

### Error State

```html
<div class="fns-form__status" role="alert" aria-live="assertive" hidden>
  <div class="fns-form__error--global">
    <h3>Something Went Wrong</h3>
    <p>We could not send your message. Please check your connection and try again.</p>
    <p>If the problem persists, contact us on WhatsApp: <a href="https://wa.me/254713639205">+254 713 639 205</a>.</p>
  </div>
</div>
```

### Inline Field Errors

```html
<div class="fns-form__field">
  <label for="contact-phone">Phone Number <span aria-label="required">*</span></label>
  <input type="tel" id="contact-phone" name="phone" required
         aria-describedby="contact-phone-error" aria-invalid="true">
  <span class="fns-form__error" id="contact-phone-error" role="alert">
    Please enter a valid Kenyan phone number (e.g., 0712345678).
  </span>
</div>
```

### Message Standards

| Rule | Requirement |
|------|-------------|
| Success message appears within the form container. | User sees it without scrolling. |
| Success message includes next steps and related content links. | Keeps the user engaged. |
| Error message is specific, not generic. | "Check your connection" not "An error occurred". |
| Error message provides an alternative contact method. | WhatsApp link or phone number for urgent cases. |
| Inline errors use `role="alert"` and `aria-describedby`. | Screen readers announce the error. |
| Global error uses `role="alert"` and `aria-live="assertive"`. | Immediate announcement. |
| Success uses `role="status"` and `aria-live="polite"`. | Announced after current screen reader output. |
| Messages do not use colour alone to convey meaning. | Icons + text + colour combined. |
| Form fields are not cleared on error. | Users can fix mistakes without retyping everything. |

---

## 14. Spam Prevention Strategy

| Technique | Implementation | How It Works |
|-----------|--------------|--------------|
| **Honeypot field** | Hidden input humans ignore, bots fill | If honeypot has a value, reject submission |
| **Time-based check** | `data-timestamp` on form render | Reject submissions under 3 seconds |
| **Rate limiting** | `sessionStorage` counter | Max 3 submissions per session per form |

```html
<div class="fns-form__field fns-form__field--honeypot" aria-hidden="true">
  <label for="website">Leave this empty</label>
  <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
</div>
```

```javascript
function isSpamSubmission(form) {
  const honeypot = form.querySelector('input[name="website"]');
  if (honeypot && honeypot.value) return true;
  const elapsed = Date.now() - parseInt(form.dataset.timestamp, 10);
  if (elapsed < 3000) return true;
  const key = `fns-form-submits-${form.dataset.formType}`;
  const count = parseInt(sessionStorage.getItem(key) || '0', 10);
  if (count >= 3) return true;
  sessionStorage.setItem(key, String(count + 1));
  return false;
}
```

### Spam Prevention Rules

| Rule | Requirement |
|------|-------------|
| Honeypot is visually hidden but not `display: none`. | Some bots detect `display: none`. Use off-screen positioning. |
| Honeypot has `tabindex="-1"` and `aria-hidden="true"`. | Screen readers and keyboard users never encounter it. |
| Time check is lenient (3 seconds minimum). | Fast typers should not be blocked. |
| Never use CAPTCHA by default. | Only if honeypot and time checks fail to stop spam. |

---

## 15. Future Firebase Integration Points

**Not to be built yet.** Document only.

```javascript
async function submitFormToFirebase(formData, formType) {
  const leadRef = await db.collection('leads').add({
    ...formData,
    formType,
    status: 'new',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    source: window.location.pathname
  });
  await firebase.functions().httpsCallable('notifyNewLead')({
    leadId: leadRef.id,
    formType
  });
  return leadRef.id;
}
```

### Firebase Form Rules (Future)

| Rule | Requirement |
|------|-------------|
| All form data sanitized before Firestore write. | Strip HTML, trim strings, validate types. |
| Firestore security rules restrict writes. | Only authenticated or verified submissions. |
| Timestamps use server-side values. | `FieldValue.serverTimestamp()` for accuracy. |
| Source URL captured with every submission. | Analytics: which pages convert best? |
| Form type always included. | Routing and categorization. |
| UTM parameters captured if present. | Marketing attribution. |

---

## 16. Future Email Notification Workflow

**Not to be built yet.** Document only.

### Email Workflow

```
User submits form
  |
  v
Client-side validation passes
  |
  v
Data sent to Firebase / server endpoint
  |
  v
Cloud function triggers email notification
  |
  +---> Team email: "New lead: Interior Design inquiry from John"
  |
  +---> Auto-reply to user: "Thank you for contacting Furnostyles..."
```

### Email Content Standards

| Email Type | Content Requirements |
|------------|------------------------|
| **Team notification** | Lead source page, form type, all field values, timestamp, link to lead in dashboard |
| **User auto-reply** | Thank you, expected response time (24h), WhatsApp alternative, portfolio/blog links |
| **Follow-up reminder** | Sent 48h after submission if no response; includes original inquiry details |

### Email Rules (Future)

| Rule | Requirement |
|------|-------------|
| Team emails sent immediately upon submission. | Real-time lead alerts. |
| User auto-replies sent immediately. | Confirmation of receipt. |
| Emails use Furnostyles branded template. | Consistent logo, colours, typography. |
| Emails include a direct link to the lead record. | Team can click to view full details. |

---

## 17. Future WhatsApp Integration Workflow

**Not to be built yet.** Document only.

```html
<!-- Pre-filled message with form data (future) -->
<a class="fns-btn fns-btn--whatsapp" id="fns-whatsapp-submit"
   href="https://wa.me/254713639205?text=Hi%20Furnostyles..."
   target="_blank" rel="noopener noreferrer">
  Send via WhatsApp
</a>
```

```javascript
function generateWhatsAppLink(formData) {
  const phone = '254713639205';
  const message = encodeURIComponent(
    `Hi Furnostyles,\n\n` +
    `I'd like to inquire about: ${formData.service || 'your services'}\n` +
    `Name: ${formData.name}\n` +
    `Phone: ${formData.phone}\n` +
    `Message: ${formData.message}\n\n` +
    `Sent from: ${window.location.href}`
  );
  return `https://wa.me/${phone}?text=${message}`;
}
```

### WhatsApp Integration Rules (Future)

| Rule | Requirement |
|------|-------------|
| WhatsApp button available on every form as an alternative. | Users choose their preferred channel. |
| Pre-filled message includes form context. | The team knows what the user is asking about. |
| WhatsApp link opens in a new tab. | User stays on the site if the chat fails. |
| Chat float remains visible on all pages. | Always accessible, even without a form. |

---

## 18. Future CRM/Customer-Tracking Strategy

**Not to be built yet.** Document only.

### Lead Lifecycle

```
New Lead
  |
  v
Contacted (team reaches out within 24h)
  |
  v
Qualified (budget, timeline, needs confirmed)
  |
  v
Quoted (formal quote sent)
  |
  v
Accepted (client accepts quote)
  |
  v
In Progress (project underway)
  |
  v
Completed (project delivered)
  |
  v
Follow-up (satisfaction check, referral request)
```

### CRM Data Model (Future)

```javascript
{
  leadId: 'lead-abc123',
  formType: 'quote-request',
  source: '/services/interior-design.html',
  status: 'new',
  createdAt: Timestamp,
  assignedTo: 'team-member-id',
  customer: { name: 'John Doe', phone: '+254712345678', email: 'john@example.com' },
  inquiry: { service: 'interior-design', budget: '500k-1m', propertyType: 'standalone' },
  notes: [ { timestamp: Timestamp, author: 'Jane', text: 'Called, left voicemail.' } ],
  tags: ['high-budget', 'urgent']
}
```

### CRM Rules (Future)

| Rule | Requirement |
|------|-------------|
| Every form submission creates a lead record. | No inquiry is lost. |
| Lead status updated manually by the team. | Human judgment for progression. |
| Notes are timestamped and attributed. | Accountability and context. |
| Tags help filter and prioritize leads. | "High-budget", "urgent", "repeat-client". |
| Source URL captured for attribution. | Marketing ROI analysis. |
| Follow-up reminders generated automatically. | No lead is forgotten. |
| Duplicate detection prevents multiple records for the same person. | Phone number or email matching. |

---

## 19. File Upload Strategy for Future

**Not to be built yet.** Document only.

```html
<div class="fns-form__field">
  <label for="upload-moodboard">Upload Inspiration Images</label>
  <input type="file" id="upload-moodboard" name="moodboard"
         accept="image/jpeg,image/png,image/webp"
         multiple
         data-max-files="5"
         data-max-size-mb="5"
         aria-describedby="upload-help upload-error">
  <p class="fns-form__help" id="upload-help">
    Up to 5 images. JPEG, PNG, or WebP. Max 5MB each.
  </p>
  <span class="fns-form__error" id="upload-error" role="alert" hidden></span>
</div>
```

### Upload Rules (Future)

| Rule | Requirement |
|------|-------------|
| Client-side validation checks file type, size, and count before upload. | Prevents unnecessary uploads. |
| Accepted types explicitly listed. | `accept="image/jpeg,image/png"` not `accept="image/*"`. |
| Max file size clearly communicated. | Users know the limit before selecting files. |
| Files stored in structured path. | `uploads/{leadId}/{timestamp}_{filename}` |
| Files virus-scanned on the server. | Security. |
| File URLs not publicly guessable. | UUID-based paths, not sequential IDs. |
| Thumbnails generated for images. | Fast preview in the dashboard. |

---

## 20. Form Accessibility Standards

### Accessibility Requirements

| Requirement | Implementation |
|-------------|--------------|
| **Every input has a label** | `<label for="id">` or wrapped `<label>` |
| **Required fields are marked** | `*` with `aria-label="required"` |
| **Error messages are associated** | `aria-describedby` points to error element |
| **Error elements use `role="alert"`** | Screen readers announce errors immediately |
| **Invalid fields use `aria-invalid="true"`** | Screen readers know the field is in error |
| **Fieldsets group related fields** | `<fieldset>` + `<legend>` for sections |
| **Form has a heading** | `<h2>` or similar before the `<form>` |
| **Submit button is focusable** | `<button type="submit">` not `<div>` |
| **Success message uses `role="status"`** | Announced politely after submission |
| **No autofocus on form load** | Users control their own focus |
| **Colour contrast meets WCAG AA** | 4.5:1 for all text, including placeholders |
| **Error colour is not the only indicator** | Icons + text + border changes combined |

### Accessible Form Example

```html
<section aria-labelledby="contact-heading">
  <h2 id="contact-heading">Get in Touch</h2>
  <form novalidate aria-describedby="contact-instructions">
    <p id="contact-instructions">Fields marked with * are required.</p>

    <div class="fns-form__field">
      <label for="contact-name">Full Name <span aria-label="required">*</span></label>
      <input type="text" id="contact-name" name="name" required
             autocomplete="name"
             aria-describedby="contact-name-error"
             aria-invalid="false">
      <span class="fns-form__error" id="contact-name-error" role="alert" hidden>
        Please enter your full name.
      </span>
    </div>

    <button type="submit" class="fns-btn fns-btn--primary">Send Message</button>
  </form>
</section>
```

### Accessibility Rules

| Rule | Requirement |
|------|-------------|
| All forms pass axe or WAVE scan with zero errors. | Automated accessibility testing. |
| Forms are fully operable with keyboard only. | Tab, Enter, Space, Escape. |
| Focus is managed after submit. | On error, focus moves to first invalid field. On success, focus moves to success message. |
| Screen reader users can understand the form structure. | Fieldsets, legends, labels, and ARIA attributes. |
| Colour is never the only way to convey information. | Error borders + text + icons, not just red colour. |

---

## 21. Shared Reusable Form Component Strategy

### Component Inventory

| Component | Class | Reused In |
|-----------|-------|-----------|
| **Form container** | `.fns-form` | All forms |
| **Form row (1 column)** | `.fns-form__row` | All forms |
| **Form row (2 columns)** | `.fns-form__row--2` | Contact, quote, booking |
| **Form field** | `.fns-form__field` | All forms |
| **Text input** | `.fns-form__input` | All forms |
| **Textarea** | `.fns-form__textarea` | Contact, quote, onboarding |
| **Select** | `.fns-form__select` | Quote, service inquiry, booking |
| **Checkbox** | `.fns-form__check` | Consent, preferences |
| **Checkbox group** | `.fns-form__checks` | Room selection, categories |
| **Radio group** | `.fns-form__radios` | Single-choice questions |
| **File upload** | `.fns-form__file` | Onboarding, moodboards |
| **Help text** | `.fns-form__help` | File uploads, complex fields |
| **Error message** | `.fns-form__error` | All forms |
| **Fieldset** | `.fns-form__fieldset` | Quote, onboarding, vendor app |
| **Submit button** | `.fns-btn--primary` | All forms |
| **Success message** | `.fns-form__success` | All forms |
| **Global error** | `.fns-form__error--global` | All forms |

### Why Components Are Reusable

```css
/* style.css - one definition for all forms */

.fns-form {
  max-width: 800px;
  margin: 0 auto;
}

.fns-form__row {
  display: grid;
  gap: 1rem;
}

.fns-form__row--2 {
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 767px) {
  .fns-form__row--2 {
    grid-template-columns: 1fr;
  }
}

.fns-form__field {
  margin-bottom: 1.5rem;
}

.fns-form__field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.fns-form__field input,
.fns-form__field select,
.fns-form__field textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--fns-border);
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
}

.fns-form__field input:focus,
.fns-form__field select:focus,
.fns-form__field textarea:focus {
  border-color: var(--fns-accent);
  outline: 2px solid var(--fns-accent);
  outline-offset: 2px;
}

.fns-form__field input[aria-invalid="true"],
.fns-form__field select[aria-invalid="true"],
.fns-form__field textarea[aria-invalid="true"] {
  border-color: var(--fns-error);
}

.fns-form__error {
  display: block;
  margin-top: 0.5rem;
  color: var(--fns-error);
  font-size: 0.875rem;
}

.fns-form__error[hidden] {
  display: none;
}

.fns-form__success {
  padding: 1.5rem;
  background: var(--fns-success-bg);
  border-left: 4px solid var(--fns-success);
  border-radius: 4px;
}
```

### Component Rules

| Rule | Requirement |
|------|-------------|
| All form components are defined in `style.css` once. | No per-page form styling. |
| Form modifiers (`--contact`, `--quote`, `--service`) are minimal. | Only for layout differences, not visual differences. |
| Form components use CSS variables for colours. | One token change updates all forms. |
| Form components are documented in `page-template-system.md`. | Cross-reference for consistency. |

---

## 22. Which Form Logic Should Remain Centralized

### Centralized Form Logic

| Logic | Central Location | Why Centralized |
|-------|------------------|-----------------|
| **Validation rules** | `form-validation.js` | One set of rules for all forms. |
| **Validation engine** | `form-validation.js` | Reusable `validateField()`, `showError()`, `clearError()`. |
| **Spam detection** | `form-validation.js` | Honeypot, time check, rate limiting for all forms. |
| **Form submission handler** | `main.js` or `form-handler.js` | One function handles all form types. |
| **Success/error display** | `form-handler.js` | Consistent UX across all forms. |
| **Loading state management** | `form-handler.js` | Disables button, shows spinner uniformly. |
| **Firebase integration** | `firebase-bridge.js` | One write path for all form data. |
| **UTM parameter capture** | `main.js` | Marketing attribution for all forms. |
| **Source URL capture** | `main.js` | Every form automatically captures `window.location.href`. |
| **WhatsApp link generation** | `form-handler.js` | One function generates pre-filled messages. |

---

## 23. Which Form Styles Should Never Be Duplicated

### The Forbidden Duplication List

| Style | Why It Must Not Be Duplicated | Safe Alternative |
|-------|------------------------------|------------------|
| **Input border styles** | Inconsistent borders look unprofessional. | Define once in `style.css` `.fns-form__field input`. |
| **Focus styles** | Inconsistent focus rings confuse keyboard users. | Define once in `style.css` `:focus`. |
| **Error border colour** | Red borders should be the same red everywhere. | Define once as CSS variable `--fns-error`. |
| **Success message styling** | Success messages should look identical on every form. | Define once `.fns-form__success`. |
| **Button styles** | Primary, secondary, ghost buttons must be uniform. | Define once in `style.css` `.fns-btn*`. |
| **Form spacing** | Margin between fields should be consistent. | Define once `.fns-form__field`. |
| **Label font weight** | Labels should look the same on every form. | Define once `.fns-form__field label`. |
| **Placeholder colour** | Placeholder text should have consistent contrast. | Define once `::placeholder`. |
| **Fieldset styling** | Grouped forms should have consistent section borders. | Define once `.fns-form__fieldset`. |
| **Honeypot hiding** | Honeypot must be hidden the same way everywhere. | Define once `.fns-form__field--honeypot`. |

---

## 24. AI-Safe Editing Workflow for Forms

### AI Form Editing Rules

| Step | Action | Rationale |
|------|--------|-----------|
| **1. Read this document first.** | Before editing any form, read `forms-and-lead-system.md`. | Understand validation, accessibility, and UX standards. |
| **2. Check existing form patterns.** | Read `style.css` for `.fns-form*` classes. | Reuse existing components; do not invent new classes. |
| **3. Use existing CSS classes only.** | `.fns-form`, `.fns-form__field`, `.fns-btn--primary`, etc. | Consistency across all forms. |
| **4. Add `data-form-type` to every form.** | Identifies the form for analytics and routing. | Every form must have a unique type. |
| **5. Associate labels with inputs via `for` and `id`.** | Accessibility requirement. | Never use placeholder as a label. |
| **6. Add `aria-describedby` and error elements.** | Screen reader accessibility. | Every required field needs an error message. |
| **7. Use `novalidate` on all `<form>` elements.** | Disables browser validation; use custom JS. | Consistent UX across browsers. |
| **8. Add the honeypot field to every form.** | Spam prevention. | Hidden field, `tabindex="-1"`, `aria-hidden="true"`. |
| **9. Add `data-timestamp` to every form.** | Spam time-check. | Set on page load. |
| **10. Validate all new fields against the validation engine.** | If a new field type is added, add a rule to `form-validation.js`. | Centralized validation. |
| **11. Test keyboard navigation.** | Tab through all fields, submit with Enter. | Accessibility. |
| **12. Test on mobile.** | Font size >= 16px, touch targets >= 44px. | Mobile UX. |
| **13. Run the testing checklist.** | Section 25 before declaring complete. | Catches errors before deployment. |

### AI Form Danger Zone

| Dangerous Action | Why It Breaks the Form |
|------------------|------------------------|
| Adding inline styles to form fields | Overrides design tokens, creates inconsistency. |
| Inventing new class names without adding to `style.css` | Styles will not apply; fields look broken. |
| Removing `novalidate` from `<form>` | Browser tooltips override custom validation UX. |
| Forgetting `aria-describedby` on required fields | Screen readers cannot announce errors. |
| Using `<div>` instead of `<button>` for submit | Not keyboard accessible, not announced as button. |
| Adding `required` without an associated error message | Users do not know why the form will not submit. |
| Duplicating form CSS in page-specific styles | Creates maintenance debt; updates become impossible. |
| Changing validation rules in one form but not the engine | Inconsistent validation across the site. |
| Removing the honeypot field | Increases spam with no benefit. |
| Using `type="text"` for email or phone | Wrong keyboard on mobile, no native validation. |
| Adding a second `<h1>` on a form page | Confuses search engines and screen readers. |

---

## 25. Recommended Testing Checklist Before Deployment

### Form Structure Checklist

- [ ] Form uses `<form>` element with `novalidate`.
- [ ] Form has `data-form-type` attribute.
- [ ] Form has a clear heading before it.
- [ ] All inputs have associated `<label>` elements.
- [ ] Labels use `for` attribute matching input `id`.
- [ ] Required fields marked with `*` and `aria-label="required"`.
- [ ] `autocomplete` attributes present on name, email, phone fields.
- [ ] `inputmode="tel"` on phone fields.
- [ ] `inputmode="email"` on email fields.
- [ ] Select dropdowns have a disabled placeholder option.
- [ ] Fieldsets group related fields with `<legend>`.
- [ ] Submit button uses `<button type="submit">`.
- [ ] Submit button text is specific and action-oriented.

### Validation Checklist

- [ ] Validation triggers on `blur`.
- [ ] Validation re-triggers on `input` after an error.
- [ ] All fields validated on submit.
- [ ] First invalid field receives focus on submit.
- [ ] Error messages are specific and actionable.
- [ ] Error messages use `role="alert"`.
- [ ] Invalid fields have `aria-invalid="true"`.
- [ ] Valid fields have `aria-invalid` removed.
- [ ] Honeypot field is present and hidden.
- [ ] Time-based spam check is implemented.
- [ ] Rate limiting is implemented (max 3 per session).

### Accessibility Checklist

- [ ] Form passes axe or WAVE scan with zero errors.
- [ ] Keyboard navigation works through all fields.
- [ ] Focus indicator is visible on all focusable elements.
- [ ] Error messages are associated with `aria-describedby`.
- [ ] Success message uses `role="status"`.
- [ ] Global error uses `role="alert"` and `aria-live="assertive"`.
- [ ] Colour is not the only error indicator.
- [ ] Touch targets are minimum 44x44px.
- [ ] Form font size is minimum 16px on mobile.

### Mobile Checklist

- [ ] Form is single-column on mobile.
- [ ] Submit button is full-width on mobile.
- [ ] No horizontal scrolling inside the form.
- [ ] Native date picker works on mobile.
- [ ] Numeric keyboard appears for phone fields.
- [ ] Email keyboard appears for email fields.
- [ ] Checkbox groups are single-column on mobile.
- [ ] Form padding is comfortable for thumb interaction.

### UX Checklist

- [ ] Placeholder text is a hint, not a label.
- [ ] Help text is present for complex fields.
- [ ] Form width is constrained (max 800px).
- [ ] Submit button is at the bottom, left-aligned.
- [ ] Loading state disables the button and shows a spinner.
- [ ] Success message includes next steps.
- [ ] Error message provides an alternative contact method.
- [ ] Form fields are not cleared on error.
- [ ] Privacy policy is linked next to consent checkbox.

### Cross-Browser Checklist

- [ ] Form renders correctly in Chrome.
- [ ] Form renders correctly in Firefox.
- [ ] Form renders correctly in Safari.
- [ ] Form renders correctly in Edge.
- [ ] Native date input works across browsers.
- [ ] Select dropdowns render correctly on iOS Safari.

---

## Document Summary

| # | Section | Purpose |
|---|---------|---------|
| 1 | Contact form architecture | The universal lead-capture form with all fields. |
| 2 | Quote-request form strategy | Higher-intent form with project details and budget. |
| 3 | Service inquiry workflow | Contextual forms tailored to each service page. |
| 4 | Portfolio inquiry workflow | Project-specific inquiry after proof-of-work display. |
| 5 | Marketplace inquiry (future) | Lightweight product inquiry for marketplace shoppers. |
| 6 | Vendor application (future) | Multi-step form for marketplace vendor onboarding. |
| 7 | Client onboarding (future) | Project brief capture after lead conversion. |
| 8 | Booking system (future) | Appointment scheduling with date/time preferences. |
| 9 | Form validation standards | Client-side validation engine with reusable rules. |
| 10 | Form UX best practices | Label placement, grouping, auto-fill, help text. |
| 11 | Mobile-friendly form standards | Touch targets, font size, native pickers. |
| 12 | CTA/button standards | Button hierarchy, loading states, action-oriented text. |
| 13 | Success/error message standards | Accessible feedback with next steps and alternatives. |
| 14 | Spam prevention strategy | Honeypot, time check, rate limiting without CAPTCHA. |
| 15 | Firebase integration (future) | Firestore writes, cloud functions, security rules. |
| 16 | Email notification workflow (future) | Team alerts, user auto-replies, follow-up reminders. |
| 17 | WhatsApp integration (future) | Pre-filled messages, click-to-chat, Business API. |
| 18 | CRM strategy (future) | Lead lifecycle, data model, tags, follow-up. |
| 19 | File upload strategy (future) | Client-side validation, structured storage, thumbnails. |
| 20 | Form accessibility standards | ARIA, keyboard, focus management, contrast. |
| 21 | Shared reusable components | 18 CSS component classes defined once in `style.css`. |
| 22 | Centralized form logic | 10 non-negotiable centralized logic items. |
| 23 | Forbidden duplication list | 10 form styles that must never be duplicated. |
| 24 | AI-safe editing workflow | 13 rules and 11 danger-zone actions for AI editors. |
| 25 | Testing checklist | 50+ items across 6 categories before deployment. |

**This document must be read before any form is created or modified on the Furnostyles platform.**
