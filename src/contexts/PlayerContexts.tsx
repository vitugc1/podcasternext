import { createContext, useState, ReactNode, useContext } from 'react';


type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    setPlayingState: (state: boolean) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState:() => void;
    hasNext: boolean;
    hasPrevious: boolean;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children}: PlayerContextProviderProps) {

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeindex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeindex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeindex(index);
    setIsPlaying(true);  
  }

  function togglePlay () {
    setIsPlaying(!isPlaying);
  }
  function toggleLoop () {
    setIsLooping(!isLooping);
  }
  function toggleShuffle () {
    setIsShuffling(!isShuffling);
  }
  
  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeindex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext () {
      if (isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeindex(nextRandomEpisodeIndex);
      }else if (hasNext) {
        setCurrentEpisodeindex(currentEpisodeIndex + 1);
    }
}


function playPrevious() {
    if (currentEpisodeIndex > 0) {
        setCurrentEpisodeindex(currentEpisodeIndex - 1);
    }
}
  
  return (
      <PlayerContext.Provider 
      value={{
          episodeList, 
          currentEpisodeIndex, 
          play,
          playList,
          isPlaying, 
          togglePlay,
          playNext,
          playPrevious, 
          setPlayingState,
          hasPrevious,
          hasNext,
          isLooping,
          toggleLoop,
          toggleShuffle,
          isShuffling,
          clearPlayerState
          }}
          >
          {children}
      </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}