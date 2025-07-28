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

export async function getLast10Stats(player: string, stat: string): Promise<number[] | null>{
  const { data, error } = await supabase
    .from('player_data')
    .select('*')
    .eq('PLAYER_NAME', player)
    .eq(stat, stat)
    .order('Date', { ascending: false })
    .limit(10)
    
  if (error) {
    alert(error)
    return null;
  }
  return data;
}

export async function getLast5StatsAgainst(player: string, stat: string, opp: string): Promise<number[] | null>{
  const { data, error } = await supabase
    .from('player_data')
    .select('*')
    .eq('PLAYER_NAME', player)
    .eq('MATCHUP', opp)
    .eq(stat, stat)
    .order('Date', { ascending: false })
    .limit(10)
    
  if (error) {
    alert(error)
    return null;
  }
  return data;
}