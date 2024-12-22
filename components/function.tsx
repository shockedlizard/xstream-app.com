export const formatNumber = (number: number) => {
    // thousand digit group
    return number.toLocaleString('en-US');
}

export const formatNumberWithDecimals = (number: number, decimals: number) => {
    return number.toFixed(decimals);
}

export const timeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

export const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

import Web3 from 'web3';

export const validateAddress = (address: string) => {
   try {
       if (!address) {
           return false;
       }
       
       // Cek format address
       if (!Web3.utils.isAddress(address)) {
           return false;
       }
        // Cek jika address adalah zero address
       if (address === "0x0000000000000000000000000000000000000000") {
           return false;
       }
       
       return true;
   } catch (error) {
       return false;
   }
};
