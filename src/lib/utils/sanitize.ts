/**
 * Sanitize user input to prevent XSS and injection attacks.
 * Strips HTML tags, script content, and dangerous characters.
 */
export function sanitizeInput(input: string): string {
  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, "")
    // Remove script-like patterns
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    // Remove null bytes
    .replace(/\0/g, "")
    // Trim whitespace
    .trim();
}

/**
 * Validate Indian mobile number (10 digits, starting with 6-9)
 */
export function isValidMobileNumber(number: string): boolean {
  return /^[6-9]\d{9}$/.test(number.replace(/\s/g, ""));
}

/**
 * Validate description length and content
 */
export function isValidDescription(desc: string): boolean {
  const sanitized = sanitizeInput(desc);
  return sanitized.length > 0 && sanitized.length <= 400;
}

/**
 * Validate profession field
 */
export function isValidProfession(profession: string): boolean {
  const sanitized = sanitizeInput(profession);
  return sanitized.length > 0 && sanitized.length <= 100;
}

/**
 * Validate address field
 */
export function isValidAddress(address: string): boolean {
  const sanitized = sanitizeInput(address);
  return sanitized.length > 0 && sanitized.length <= 500;
}
