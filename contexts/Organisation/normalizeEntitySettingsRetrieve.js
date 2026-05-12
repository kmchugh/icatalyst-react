/**
 * Entity-settings GET may return a single document or an array.
 * The generated list reducer expects an array payload.
 *
 * @param {*} raw Response body from the entity-settings endpoint
 * @returns {Array|*} Same array, or `[raw]` for a non-array document, or `raw` for nullish
 */
export function normalizeEntitySettingsRetrievePayload(raw) {
  if (raw == null) {
    return raw;
  }
  return Array.isArray(raw) ? raw : [raw];
}
