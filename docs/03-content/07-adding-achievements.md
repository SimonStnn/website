# Adding Achievements Guide

**Navigation**: [Documentation Home](../README.md) > [Content Management](./README.md) > Adding Achievements

---

## Table of Contents

- [Quick Start](#quick-start)
- [Step-by-Step Guide](#step-by-step-guide)
- [Achievement Types](#achievement-types)
- [Complete Examples](#complete-examples)
- [Working with Images](#working-with-images)
- [Setting the Date](#setting-the-date)
- [Order and Sorting](#order-and-sorting)
- [Adding Links](#adding-links)
- [Writing Descriptions](#writing-descriptions)
- [Testing Your Achievement](#testing-your-achievement)
- [Troubleshooting](#troubleshooting)
- [See Also](#see-also)
- [Next Steps](#next-steps)

---

## Quick Start

**TL;DR**: Create JSON file, optionally add logo, test.

```bash
# 1. Create JSON file
cat > content/achievements/my-achievement.json << 'EOF'
{
  "title": "My Achievement",
  "issuer": "Organization Name",
  "date": "2024",
  "type": "award"
}
EOF

# 2. (Optional) Add logo
cp ~/logo.webp public/images/logos/organization.webp

# 3. Test
npm run dev
# Visit http://localhost:3000/
```

---

## Step-by-Step Guide

### Step 1: Choose a Slug

The slug is derived from the filename.

**Rules**:

- Use kebab-case (lowercase with hyphens)
- Descriptive but concise
- Unique across all achievements

**Examples**:

```bash
# ✅ Good slugs
aws-solutions-architect.json      → aws-solutions-architect
rotary-award.json                 → rotary-award
ccna-1.json                       → ccna-1

# ❌ Bad slugs
AWS Cert.json                     → Invalid (spaces)
cert1.json                        → Not descriptive
my_certification.json             → Works but use hyphens
```

### Step 2: Determine Achievement Type

Choose one of three types:

1. **`certification`**: Official certifications (e.g., AWS, CCNA, Google Cloud)
2. **`award`**: Awards and recognitions (e.g., Dean's List, competition winners)
3. **`achievement`**: Other notable accomplishments (e.g., Erasmus program, hackathon participation)

### Step 3: Create JSON File

Create the file in `content/achievements/`:

```bash
# Create with basic structure
cat > content/achievements/my-certification.json << 'EOF'
{
  "title": "",
  "issuer": "",
  "date": "",
  "type": "certification"
}
EOF
```

### Step 4: Fill in Required Fields

Edit your JSON file with required data:

```json
{
  "title": "AWS Certified Solutions Architect",
  "issuer": "Amazon Web Services",
  "date": "2024",
  "type": "certification"
}
```

### Step 5: Add Optional Fields

Add description, link, and image as needed:

```json
{
  "title": "AWS Certified Solutions Architect",
  "issuer": "Amazon Web Services",
  "date": "2024-03",
  "type": "certification",
  "description": "Validates expertise in designing distributed systems on AWS.",
  "link": "https://www.credly.com/badges/...",
  "image": {
    "src": "/images/logos/aws.webp",
    "alt": "AWS logo - orange smile arrow"
  }
}
```

### Step 6: Add Logo (Optional)

If including an image, add the logo to `public/images/logos/`:

```bash
# Copy logo
cp ~/aws-logo.webp public/images/logos/aws.webp

# Verify
ls -la public/images/logos/aws.webp
```

### Step 7: Validate JSON

```bash
# Validate syntax
jq empty content/achievements/my-certification.json

# Verify required fields
jq 'has("title") and has("issuer") and has("date") and has("type")' \
  content/achievements/my-certification.json
# Should output: true
```

### Step 8: Test

```bash
# Start dev server
npm run dev

# Visit homepage
open http://localhost:3000/
# Achievement should appear in achievements section
```

### Step 9: Commit

```bash
git add content/achievements/my-certification.json
git add public/images/logos/aws.webp  # If added logo
git commit -m "Add AWS Solutions Architect certification"
git push
```

---

## Achievement Types

### Certification

For official certifications and courses.

**Examples**:

- Technical certifications (AWS, Azure, Google Cloud)
- Professional certifications (PMP, CISSP)
- Course completions (Cisco CCNA, Coursera specializations)

**JSON Example**:

```json
{
  "title": "AWS Certified Solutions Architect - Associate",
  "issuer": "Amazon Web Services",
  "date": "2024-03",
  "type": "certification",
  "description": "Validates expertise in designing and deploying scalable, highly available systems on AWS.",
  "link": "https://www.credly.com/badges/abc123",
  "image": {
    "src": "/images/logos/aws.webp",
    "alt": "AWS certification badge"
  }
}
```

### Award

For awards, prizes, and recognitions.

**Examples**:

- Academic awards (Dean's List, valedictorian)
- Competition prizes (hackathon winners)
- Recognition awards (employee of the month)
- Scholarships

**JSON Example**:

```json
{
  "title": "Top Graduating Student Recognition",
  "issuer": "Rotary International",
  "date": "2023",
  "type": "award",
  "description": "Recognized for academic excellence and mentoring struggling classmates. This award reinforced that learning isn't just personal, it's about lifting others up with you.",
  "image": {
    "src": "/images/logos/rotary-international.webp",
    "alt": "Rotary International logo - gold wheel emblem"
  },
  "order": 1
}
```

### Achievement

For other notable accomplishments.

**Examples**:

- Study abroad programs
- Conference presentations
- Publications
- Open source contributions
- Volunteer work

**JSON Example**:

```json
{
  "title": "Erasmus+ Programme in Madrid",
  "issuer": "European Commission",
  "date": "2023",
  "type": "achievement",
  "description": "Six-month exchange program at Universidad Politécnica de Madrid, studying advanced computer science topics and collaborating with international teams.",
  "link": "https://erasmus-plus.ec.europa.eu/",
  "image": {
    "src": "/images/logos/erasmus.webp",
    "alt": "Erasmus+ logo"
  }
}
```

---

## Complete Examples

### Example 1: Technical Certification

**File**: `content/achievements/aws-solutions-architect.json`

```json
{
  "title": "AWS Certified Solutions Architect - Associate",
  "issuer": "Amazon Web Services",
  "date": "2024-03",
  "type": "certification",
  "description": "Demonstrates knowledge of AWS services and ability to design distributed systems with high availability, cost optimization, and security. Covers EC2, S3, VPC, RDS, Lambda, and other core services.",
  "link": "https://www.credly.com/badges/example-badge-id",
  "image": {
    "src": "/images/logos/aws.webp",
    "alt": "AWS Certified Solutions Architect badge"
  }
}
```

**Logo Setup**:

```bash
# Add AWS logo
cp ~/downloads/aws-logo.webp public/images/logos/aws.webp
```

### Example 2: Academic Award

**File**: `content/achievements/deans-list.json`

```json
{
  "title": "Dean's List Recognition",
  "issuer": "University of Technology",
  "date": "2023",
  "type": "award",
  "description": "Achieved Dean's List honors for maintaining a 3.8+ GPA while completing advanced coursework in computer science and software engineering.",
  "order": 2
}
```

### Example 3: Study Abroad

**File**: `content/achievements/bip-madrid.json`

```json
{
  "title": "Erasmus+ Programme in Madrid",
  "issuer": "European Commission",
  "date": "2023",
  "type": "achievement",
  "description": "Participated in a six-month international exchange program at Universidad Politécnica de Madrid. Collaborated with students from 15+ countries on software development projects and studied advanced algorithms and distributed systems.",
  "link": "https://erasmus-plus.ec.europa.eu/",
  "image": {
    "src": "/images/logos/erasmus-plus.webp",
    "alt": "Erasmus+ programme logo"
  }
}
```

### Example 4: Professional Certification

**File**: `content/achievements/ccna-1.json`

```json
{
  "title": "CCNA: Introduction to Networks",
  "issuer": "Cisco Networking Academy",
  "date": "2023-06",
  "type": "certification",
  "description": "Completed comprehensive networking fundamentals course covering OSI model, TCP/IP, routing, switching, and network troubleshooting. Includes hands-on configuration of Cisco routers and switches.",
  "link": "https://www.netacad.com/courses/networking/ccna-introduction-networks",
  "image": {
    "src": "/images/logos/cisco.webp",
    "alt": "Cisco Networking Academy logo"
  }
}
```

---

## Working with Images

### Logo Guidelines

**What to Use**:

- Organization/issuer logos
- Certification badges
- Award emblems
- Program logos

**Format**:

- WebP (preferred)
- PNG (with transparency)
- SVG (if simple)

**Size**:

- Recommended: 200-400px square
- Max: 1000px
- Keep file size under 100KB

### Logo Organization

Store all achievement logos in `public/images/logos/`:

```
public/images/logos/
├── aws.webp
├── cisco.webp
├── rotary-international.webp
├── erasmus-plus.webp
├── google-cloud.webp
└── microsoft.webp
```

### Adding Logos

```bash
# Copy logo to correct location
cp ~/logo.png public/images/logos/organization.webp

# Optimize if needed
cwebp -q 80 public/images/logos/organization.png \
  -o public/images/logos/organization.webp
```

### Image Object Structure

```json
{
  "image": {
    "src": "/images/logos/organization-name.webp",
    "alt": "Organization name logo - description"
  }
}
```

**Examples**:

```json
// ✅ Good - descriptive alt text
{
  "image": {
    "src": "/images/logos/aws.webp",
    "alt": "AWS certification badge - orange smile arrow on dark background"
  }
}

// ✅ Good - simple description
{
  "image": {
    "src": "/images/logos/cisco.webp",
    "alt": "Cisco Networking Academy logo"
  }
}

// ❌ Bad - missing alt text
{
  "image": {
    "src": "/images/logos/aws.webp"
  }
}

// ❌ Bad - wrong path
{
  "image": {
    "src": "/public/images/logos/aws.webp",
    "alt": "AWS logo"
  }
}
```

### When to Omit Images

Omit the `image` field if:

- Logo not available
- Generic achievement without specific branding
- Privacy concerns

```json
{
  "title": "Hackathon Participation",
  "issuer": "Local Tech Meetup",
  "date": "2024",
  "type": "achievement"
  // No image field - perfectly fine
}
```

---

## Setting the Date

### Date Formats

Use one of these formats:

1. **Year only** (most common): `"2024"`
2. **Year and month**: `"2024-03"`
3. **Full date**: `"2024-03-15"` (month/day not displayed)

**Examples**:

```json
"date": "2024"           // Year only
"date": "2024-03"        // March 2024
"date": "2024-03-15"     // March 15, 2024 (displays as "2024")
```

### Choosing Format

**Use Year Only**:

- When exact month is not important
- For academic year awards
- For certifications valid indefinitely

**Use Year-Month**:

- For dated certifications
- For month-specific awards
- When month is significant

**Examples**:

```json
// Year only
{
  "title": "Dean's List",
  "date": "2023"  // Academic year
}

// Year and month
{
  "title": "AWS Certification",
  "date": "2024-03"  // Certification earned in March
}

// Full date (uncommon)
{
  "title": "Hackathon Winner",
  "date": "2024-03-15"  // Specific event date
}
```

### Date Validation

```bash
# Check date format
jq '.date' content/achievements/my-achievement.json

# Should output one of:
# "2024"
# "2024-03"
# "2024-03-15"
```

---

## Order and Sorting

### Default Sorting

Achievements are sorted by:

1. Items with `order` field (ascending)
2. Items without `order` field (by date, newest first)

### Using Order Field

Override date-based sorting with `order`:

```json
{
  "title": "Most Important Achievement",
  "date": "2020",
  "order": 1 // Appears first despite old date
}
```

**Example**:

```json
// Achievement A
{
  "title": "Top Award",
  "date": "2020",
  "order": 1  // Position 1 (order takes priority)
}

// Achievement B
{
  "title": "Recent Cert",
  "date": "2024"  // Position 2 (newest date without order)
}

// Achievement C
{
  "title": "Old Cert",
  "date": "2023"  // Position 3 (older date)
}
```

### When to Use Order

Use `order` when:

- Achievement is particularly significant
- Want to highlight specific accomplishments
- Override date-based sorting

Don't use `order` when:

- Chronological order is appropriate
- All achievements are equal importance

---

## Adding Links

### Link Field

Add optional `link` field for:

- Verification pages (Credly, Acclaim)
- Course information pages
- Program details
- Certificate PDFs

**Examples**:

```json
// ✅ Verification link
{
  "link": "https://www.credly.com/badges/abc123"
}

// ✅ Course information
{
  "link": "https://www.netacad.com/courses/networking/ccna"
}

// ✅ Program details
{
  "link": "https://erasmus-plus.ec.europa.eu/"
}

// ✅ Direct PDF
{
  "link": "https://example.com/certificates/my-cert.pdf"
}
```

### Link Best Practices

1. **Use HTTPS**: Always use secure URLs
2. **Prefer Official**: Link to official sources
3. **Verify Links**: Ensure links work before committing
4. **Update Regularly**: Check links don't break over time

```json
// ✅ Good - official verification
{
  "link": "https://www.credly.com/badges/abc123"
}

// ❌ Bad - unofficial or personal
{
  "link": "https://mydrive.com/my-certificate.pdf"
}

// ❌ Bad - broken link
{
  "link": "https://example.com/404"
}
```

### Omitting Links

Omit `link` if:

- No public verification available
- Private certification
- Link not relevant or useful

---

## Writing Descriptions

### Description Field

Optional but recommended field for additional context.

**Good Descriptions**:

- Explain what was learned/achieved
- Provide context about significance
- Highlight key skills or topics
- Mention specific accomplishments

**Length**: 50-200 characters recommended

### Examples

**Certification**:

```json
{
  "description": "Demonstrates proficiency in designing and deploying scalable, highly available systems on AWS. Covers compute, storage, networking, database, and security services."
}
```

**Award**:

```json
{
  "description": "Recognized for academic excellence and mentoring struggling classmates throughout the academic year. This award reinforced that learning isn't just personal, it's about lifting others up."
}
```

**Achievement**:

```json
{
  "description": "Participated in six-month international exchange program, collaborating with students from 15+ countries on software development projects while studying advanced algorithms and distributed systems."
}
```

### Writing Tips

1. **Be Specific**: Include concrete details
2. **Show Impact**: What did you accomplish or learn?
3. **Keep Concise**: 1-3 sentences maximum
4. **Avoid Jargon**: Unless industry-standard terms
5. **Proofread**: Check spelling and grammar

```json
// ✅ Good - specific and impactful
{
  "description": "Completed 40-hour comprehensive course on cloud architecture, covering compute, storage, networking, and security. Passed certification exam with 850/1000 score."
}

// ❌ Bad - too generic
{
  "description": "Got a certification in AWS."
}

// ❌ Bad - too long
{
  "description": "This certification program was really comprehensive and covered many different topics including EC2, S3, RDS, Lambda, VPC, CloudFormation, and many other services. I learned a lot about cloud computing and how to design scalable systems. The exam was challenging but I studied hard and passed on my first try..."
}
```

---

## Testing Your Achievement

### Testing Checklist

```bash
# 1. Validate JSON
jq empty content/achievements/my-achievement.json

# 2. Start dev server
npm run dev

# 3. Check homepage
open http://localhost:3000/
# ✓ Achievement appears in achievements section
# ✓ Title displays correctly
# ✓ Issuer and date shown
# ✓ Logo displays (if included)
# ✓ Description visible (if included)
# ✓ Link works (if included)

# 4. Check sorting
# ✓ Appears in correct position
# ✓ Order respected (if set)
# ✓ Date-based sorting correct (if no order)

# 5. Run production build
npm run build
# ✓ No errors in build output
```

### Visual Inspection

Check that:

- Logo is clear and not pixelated
- Text is readable
- Layout looks good
- Links open in new tab
- Description fits nicely

### Data Validation

```bash
# Check required fields
jq 'has("title") and has("issuer") and has("date") and has("type")' \
  content/achievements/my-achievement.json
# Output: true

# Check type is valid
jq '.type == "certification" or .type == "award" or .type == "achievement"' \
  content/achievements/my-achievement.json
# Output: true

# Check date format
jq '.date | test("^[0-9]{4}(-[0-9]{2})?(-[0-9]{2})?$")' \
  content/achievements/my-achievement.json
# Output: true
```

---

## Troubleshooting

### Achievement Doesn't Appear

**Symptoms**: Achievement not showing on homepage

**Possible Causes**:

1. JSON syntax error
2. File not in `content/achievements/` directory
3. Missing required field
4. Invalid `type` value

**Solutions**:

```bash
# Validate JSON
jq empty content/achievements/my-achievement.json

# Check location
ls -la content/achievements/my-achievement.json

# Verify required fields
jq 'has("title") and has("issuer") and has("date") and has("type")' \
  content/achievements/my-achievement.json

# Check type value
jq '.type' content/achievements/my-achievement.json
# Should be: "certification", "award", or "achievement"
```

### Logo Not Displaying

**Symptoms**: Broken image or no logo visible

**Possible Causes**:

1. Incorrect image path
2. Image file doesn't exist
3. Wrong directory

**Solutions**:

```bash
# Check image exists
ls -la public/images/logos/organization.webp

# Verify path in JSON
jq '.image.src' content/achievements/my-achievement.json
# Should start with: /images/logos/

# Check file permissions
chmod 644 public/images/logos/*.webp
```

### Wrong Sort Order

**Symptoms**: Achievement appears in unexpected position

**Possible Causes**:

1. Incorrect date format
2. Order field conflict
3. Multiple achievements with same order

**Solutions**:

```bash
# Check date format
jq '.date' content/achievements/my-achievement.json

# Check order value
jq '.order' content/achievements/my-achievement.json

# List all orders to check for conflicts
jq '.order' content/achievements/*.json | sort -n
```

### Link Doesn't Work

**Symptoms**: Link button doesn't appear or doesn't work

**Possible Causes**:

1. Link field missing or typo
2. Invalid URL format
3. Broken link

**Solutions**:

```bash
# Check link field exists
jq '.link' content/achievements/my-achievement.json

# Test link in browser
# Copy output and visit in browser
jq -r '.link' content/achievements/my-achievement.json
```

---

## See Also

- [JSON Schema Reference](./02-json-schema.md) - Complete achievement schema
- [TypeScript Interfaces](./03-typescript-interfaces.md) - Achievement interface details
- [Image Handling Guide](./08-image-handling.md) - Logo optimization
- [Data Fetching API](./04-data-fetching.md) - How achievements are loaded
- [CMS Overview](./01-cms-overview.md) - System architecture

---

## Next Steps

1. **Plan Your Achievements**: List all certifications, awards, and achievements
2. **Gather Assets**: Collect logos and verification links
3. **Create Files**: Add JSON files for each achievement
4. **Add Logos**: Optimize and add organization logos
5. **Test**: Verify everything displays correctly
6. **Deploy**: Commit and push changes

---

**Last Updated**: February 2026  
**Maintainer**: Development Team  
**Related Files**: `content/achievements/`, `public/images/logos/`, `lib/achievements.ts`
