const STORAGE_KEY = 'novatech-saved-gadgets';
export async function loadGadgets() { const response = await fetch('data/gadgets.json'); if (!response.ok) throw new Error(`HTTP ${response.status}`); const data = await response.json(); if (!Array.isArray(data)) throw new Error('Unexpected gadget data'); return data; }
export function readSaved() { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(saved) ? saved : []; } catch { return []; } }
export function toggleSaved(id) { const saved = readSaved(); const updated = saved.includes(id) ? saved.filter(item => item !== id) : [...saved,id]; try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch (error) { console.warn('Local storage unavailable:', error); } return updated; }
export function escapeHTML(value) { return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
