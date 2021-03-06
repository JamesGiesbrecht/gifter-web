import { FC } from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'

import { ReactComponent as GoogleLogo } from 'assets/images/googleLogo.svg'

const GoogleIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <GoogleLogo />
  </SvgIcon>
)

export default GoogleIcon
