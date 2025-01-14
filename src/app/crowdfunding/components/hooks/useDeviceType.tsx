import { useMediaQuery } from 'react-responsive';

const useDeviceType = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    return isMobile;
}

export default useDeviceType;
