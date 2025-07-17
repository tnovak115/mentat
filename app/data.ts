import { supabase } from '../supabase';

export async function getLast5Matchups(team: string, opponent: string) {
  const { data, error } = await supabase
    .from('nba_matches')
    .select('*')
    .eq('Team', team)
    .eq('Opponent', opponent)
    .order('Date', { ascending: false })
    .limit(5)
    
  if (error) {
    alert(error)
    return null;
  }
  return data;
}