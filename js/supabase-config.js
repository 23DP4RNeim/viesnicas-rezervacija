// ===========================
// Supabase Configuration
// ===========================

(function initSupabase() {
    const SUPABASE_URL = 'https://iziqcwdgznpemtzzvnau.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_gnhJIZOeSALXZce2_9b7-w_HpEvzomY';

    window.SUPABASE_CONFIG = {
        url: SUPABASE_URL,
        anonKey: SUPABASE_ANON_KEY
    };

    if (!window.supabase || !window.supabase.createClient) {
        console.warn('Supabase library was not loaded. Bookings will be saved locally only.');
        window.supabaseClient = null;
        return;
    }

    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase initialized');
})();
