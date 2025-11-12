import React from 'react';
import type { Student } from '../types';
import type { jsPDF } from 'jspdf';

// Declare global variables from CDN scripts
declare global {
    interface Window {
        html2canvas: any;
        jspdf: { jsPDF: typeof jsPDF };
    }
}

// Base64 encoded logo to avoid dealing with static assets
// const logoSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARcAAAA0CAYAAABaF22aAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAfESURBVHhe7Z1/bJVVFMd/e/el+5wKxS/UFD80pCh/qP5YoywxUhUaEyMEY3yhkQgiPmiM+EMjBvFDNMaAYPyBDzUqhqmPNCYEU/ypYJRCBQqlnO7f2/t+tnPuvfecu/fec+/p+MhJ1uPcc/Zea79rvbX22hO/92//XlAoFAqFQiEgRKFQKBQKhYAIUagUCkUhIEYQhcv+lK+X1yLw0iS8Lw0nL0nCixJwwfJ7hL0oFGf9uI2337aH23fvo8vN5a758iS8dAWvvvUW3n33vVz/9Ok+Llu6nAv/u41P3/8w/tO/vYSv/+lVXP70KZw5fSZ3ffL4Fm7cvIWrl5fz1hUKRRFCMIQvX/mF06cvY/HSpVx46eJ98p/e+GGuX3r+Iu57+F1cunjxPh0+fDgnTqzh4Qf2ctmShXzzz/fxxz95P3d98uQp3P/Q/dzz8P3c/fBDd6lQKEohCEMYPn3uPC5dupRr/+E9HDt2grVrV7HkyZPYuHFzrn39zGmce/5lHDt2nOufOXOaKxfPo/fee5drHzt2nHPnzufat2/fw5Ilc3nxxZfxxRefYPXqFezYsRcrV87j+vUruHDhApYuXcq9997rWlcoFEUIIQxD0F988RXWrl3LNWfPnsWqVXN4/PHHePDBB7l+8aLFHDx4iIULF3L16tUruH79eq4vW7ac5cuXc+2f//znXHvw4AG++OIL/POf/0yFQlEUQggD0E8//ZQb1qxZw1/+8heWL1/Ob3/721x748YNXH/u3Dk8+eST/PjHP+bq2bNnsWXLFq5fuXKlVChU/kIIYSgUvjNnzuDtt9/mjhdeeAFr167l2vXr1/PTTz/h559/ztdff80d//nPf/LVV1/x9NNPc/2LL77Ijz/+mO9+97u5/r59+/D9738/l544cQJbt25l586dXH/x4kUsXryYmzdv5qmnnuK5555zrcs/+clP+Oijj1i1ahXr1q1z5wMHDuS5557jmWee4dlnn+U73/kOlixZwsKFC7n6xIkT+ec//5mr9+7dw89//nO+/vrrfP3117n6Sy+9xNtvv803v/lNrn316lW+/vrrXH/48GFefvllvva1r3Hdd999l5deeokLFy5QrVDoHyGEIQR9++23uXb+/Hlee+01vvOd77Bu3TouXbqUCxcu5I4vvvgi9957L9d//vOf+fDDD7n2hx9+yPe//32uP3HiBJ599lmufe/ePdx3333cd999XLt7926uvW/fPhYvXszrr7/O6j/4wQ/405/+xLfffsu1a9eu4t577+Xyyy/H7NmzufrXX3/l2muXLufOO++sWiHw/yEEQRC+d+9ebl6xYgXXXnste/bs4b777mPatGnceeedXHfmzBnee+89fvSjH/Hwww/zm9/8hqt/+eWXeeihh9i4cSO/+MUv+Prrr/njH/9YtULgD4QQhOHLL7/k5j/84Q9ce+WV3HrrrVR76Uf94osvUnvp5z5C//7v/35P+UoUCoUiQhCGYRhC0L///e98+eWX+de//pVqT/3sZz+j2lM/e/bsKe9IUagUChVhhCAI+vnnn/nGN75Btad+9913v/eUr0ShUCgUhAghCPrHP/5Btad+4eLFf8pXohAodEIQhH7w4MFe+Ur+Q6FQKBQKIuQvUagUCkUhIEYQhcv5c+fwwx/+kGtefvkSVqxYwJIlS1myZAlLlixh8eLFvPbaa2zbts2NGzduYN26dZcuXcLcuXPYunUrS5YsYcGCBay9thpPP/00p59+Ote+ePEi1167di3Xnzp1ivvvv58HHniAe++9lw9/+MNcd9euXVy/di0PProXmzZt4oUXXmDp0qVceeWVPP300/zzn//M9W+88QZr1qxh8eLF/PrXv+bb3/423/nOdzh27BgnT55Mhe4jKBTKIYQQhC/uvPMOFqxYxJIlS1i6dCm//OUvefLJJzn22GO57rXXXuPaa69l586drF69mkWLFvHss88yc+ZMrl+/fj3f/e53+eY3v8mdd95J5aL/hUJx3iEI+ieffMKNq1evZuHChVx79dVXeeONN5g+fTofffQRn/vc57jqX/ziF7z55pucffbZfPjDH+bqjz/+OP/85z85+uij6fLwDy4UivMCIYRhCF999RUWLFjAD3/4Q65/9913+fOf/8xjjz3Gj3/8Yy699FLuvffe3Hv//fzpT3/i+nv27OHNt99m+fLlrFu3jpdeeomHH36YW2+9ldtvv52NGzcyderUrH/16lW+/vrrXH/16lXs2rUL69ato0L3EYg/yOUnQgiG/vDDD/nOd77DL37xi1xxxRVUa9Kne+++m/vvv59rf/fdd/z5z3/mtttu4+mnn+bbb7/lrbfeyhtvvEEF7yMIFGf9l770JdWe/sADD3DrrbeyatUq/vznP3P9/fv3p3KxI4RCcR4hCAIYfvCDH1Dv2fvuu4/f//73/M///I9rr7nmGqpfQ/kKFArF+YQQ/OMf/8j6Vz/96U/Ztm0bv//977l+/fr1XHfXXXdy9dVXU++p//Vf/+WBBx7ghhtu4Omnn6Za9yEUCuX6RCEIQhCG/va3v7Fu3TrWrl3LddeuXcu111zT/vSnP3H9gw8+SG2n/o9//CMA0uXmIgoFhS8QQhCGYRj6hRdeoNpT/+///s+tt95Kted+5JFH+MMf/kC1p77//vsJkK9EIVDoCCEIQhCGv/3tb9T79k8//ZRqT33//ffT7e7/U4VCUSgUhAghhK/85StUe+ovvfQSt9xyC/Wefcstt/DHf/wjlUtdIBSKEgJCCEIwhP7www/5xS9+wbVr167hvvvuY8stt3D9t9xyC9f+z3/+U2yU/yEIFGohBEEQhOHtt9/m5t9//31++ctfcsc1a9Zw5ZVXcsstt3D99evXc823336bb3zjG+yzzz4k9f9D/gsF7yEIwvDyyy/zy1/+kvuvv55f//rXuO6HH37IG2+8wVtvvcV7773H5Zdfzvvvv5/KxX5CIFDod4T+4x//SPWnPvroo9xyyy1Ue+p33nmHr776ikt/9dVXee+99/jJT35CtSc/+uijXH/ppZdyyy23cMstt3Dttddeyy+//JLnn3+e73//+9xxxx3cd999VFv+V1AoFAqFQiEgQhQKhUKhUBAgChUKhUKhECBCFIpCoVAoCASIUKFQKBQKBUKAClEoFAqFQkCEKBSFQqFQIBAgQhSKQqFQKAQEiFCoFAqFQkEACFEoFAqFQkCEKBSFQqFQKAQkRKEQEKJQKBQKhYAIFQqFQqFQEARCoVAoFIWCECEKhUKhUAgI+A+E0R8L4G8y9wAAAABJRU5ErkJggg==";

interface CertificateProps {
  student: Student;
  onLogout: () => void;
  workshopDate: string | null;
  workshopName: string | null;
}

const Certificate: React.FC<CertificateProps> = ({ student, onLogout, workshopDate, workshopName }) => {
    const [isDownloading, setIsDownloading] = React.useState(false);

    const handleDownload = () => {
        const certificateElement = document.getElementById('certificate-to-download');
        const downloadButton = document.getElementById('download-button');
        const logoutButton = document.getElementById('logout-button');

        if (certificateElement) {
            setIsDownloading(true);

            // Temporarily hide buttons for the screenshot
            if(downloadButton) downloadButton.style.display = 'none';
            if(logoutButton) logoutButton.style.display = 'none';

            window.html2canvas(certificateElement, { 
                scale: 3, // Higher scale for better PDF quality
                useCORS: true,
                backgroundColor: null, 
            }).then((canvas: HTMLCanvasElement) => {
                const imgData = canvas.toDataURL('image/png');
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'px',
                    format: [canvas.width, canvas.height],
                });
                pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                pdf.save(`Workshop_Certificate_${student.name.replace(/\s/g, '_')}.pdf`);

                // Show buttons again
                if(downloadButton) downloadButton.style.display = 'inline-flex';
                if(logoutButton) logoutButton.style.display = 'inline-flex';

                setIsDownloading(false);
            }).catch(err => {
                 // Make sure buttons are visible even if there's an error
                if(downloadButton) downloadButton.style.display = 'inline-flex';
                if(logoutButton) logoutButton.style.display = 'inline-flex';
                console.error("Error generating PDF:", err);
                setIsDownloading(false);
                alert("Could not generate PDF. Please try again.");
            });
        }
    };


  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
                id="download-button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isDownloading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Downloading...
                    </>
                ) : 'Download as PDF'}
            </button>
            <button
                id="logout-button"
                onClick={onLogout}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand-red bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Logout
            </button>
        </div>
        <div id="certificate-to-download" className="bg-white p-8 shadow-2xl relative border-8 border-yellow-600">
            <div className="absolute inset-0 border-2 border-yellow-400 m-2"></div>
            <div className="relative text-center">
                <div className="flex justify-center mb-6">
                    <img src="assets/images/rkslogo.png" alt="RKS Infotech Logo" className="h-20" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-brand-blue font-serif tracking-wider">
                    Certificate of Completion
                </h1>
                <p className="mt-6 text-lg text-gray-600">This certificate is proudly presented to</p>
                <p className="text-3xl sm:text-4xl font-bold text-brand-red my-8 font-['Playfair_Display']">
                    {student.name}
                </p>
                <p className="text-lg text-gray-600">
                    for successfully completing the workshop on
                </p>
                <h2 className="text-2xl font-semibold text-brand-blue my-4">
                    "{workshopName || 'Advanced Web Technologies & Frameworks'}"
                </h2>
                <p className="text-gray-500">conducted by RKS Infotech.</p>
                
                <div className="mt-16 flex flex-col sm:flex-row justify-between items-center text-gray-700">
                    <div className="text-center">
                        <p className="font-bold border-t-2 border-gray-400 pt-2 px-8">Workshop Coordinator</p>
                    </div>
                    <div className="text-center mt-8 sm:mt-0">
                        <p className="font-bold border-t-2 border-gray-400 pt-2 px-8">Date: {workshopDate || new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;