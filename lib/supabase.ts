import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://mwoyfmibkkkadlhmngsu.supabase.co/rest/v1/",
  "sb_publishable_j2mqLeHhyocrgoyoIiN-Fw_VgNwwyT3"
);