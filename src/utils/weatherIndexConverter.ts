export const epaUSIndexConverter = (idx: number) => {
  switch(idx){
    case 1:
      return 'Good'
    case 2:
      return 'Moderate'
    case 3: 
      return 'Unhealthy for sensitive group'
    case 4:
      return 'Unhealthy'
    case 5:
      return 'Very Unhealthy'
    case 6: 
      return 'Hazardous'
  }
}

export const UVIndexConverter = (idx: number) => {
  if(idx >= 0 && idx <=2){
    return 'Low'
  }

  if(idx >=3 && idx <= 5){
    return 'Moderate'
  }

  if(idx >= 6 && idx <=7){
    return 'High'
  }

  if(idx >= 8 && idx<=10){
    return 'Very High'
  }

  if(idx >= 11){
    return 'Extreme Risk'
  }
}

export const isRain = (weatherStatus: string) => {
  return weatherStatus.toLocaleLowerCase().includes('rain') ? true : false;
}