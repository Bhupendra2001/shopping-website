import {css} from  'styled-components'

export const mobil = (props) =>{
return css`
@media only screen and (max-width:380px){
   ${props}
  }
`
}

export const tablet = (props) => {
  return css`
  @media only screen and (min-width: 381px) and (max-width: 850px){
    ${props}
   }
  `
}