const supabaseurl = "https://cublrhseuimoelicjwft.supabase.co";
const supabasekey = "sb_publishable_XDh3q7l6VmYweaHszPpZFg_f9yy_mtl";

const supabaseClient = window.supabase.createClient(
    supabaseurl,
    supabasekey
);

console.log("supabase client initialized!")