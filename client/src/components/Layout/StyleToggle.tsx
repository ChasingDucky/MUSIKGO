import { IconButton, Tooltip } from '@mui/material';
import { Lens, LensBlur } from '@mui/icons-material';
import { useUIStore } from '@/stores/uiStore';

export function StyleToggle() {
  const { style, toggleStyle } = useUIStore();

  return (
    <Tooltip title={`Switch to ${style === 'liquid-glass' ? 'Material UI' : 'Liquid Glass'} style`}>
      <IconButton onClick={toggleStyle} color="inherit">
        {style === 'liquid-glass' ? <Lens /> : <LensBlur />}
      </IconButton>
    </Tooltip>
  );
}
