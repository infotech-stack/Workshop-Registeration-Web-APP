
import React from 'react';

// Base64 encoded logo to avoid dealing with static assets
// const logoSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARcAAAA0CAYAAABaF22aAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAfESURBVHhe7Z1/bJVVFMd/e/el+5wKxS/UFD80pCh/qP5YoywxUhUaEyMEY3yhkQgiPmiM+EMjBvFDNMaAYPyBDzUqhqmPNCYEU/ypYJRCBQqlnO7f2/t+tnPuvfecu/fec+/p+MhJ1uPcc/Zea79rvbX22hO/92//XlAoFAqFQiEgRKFQKBQKhYAIUagUCkUhIEYQhcv+lK+X1yLw0iS8Lw0nL0nCixJwwfJ7hL0oFGf9uI2337aH23fvo8vN5a758iS8dAWvvvUW3n33vVz/9Ok+Llu6nAv/u41P3/8w/tO/vYSv/+lVXP70KZw5fSZ3ffL4Fm7cvIWrl5fz1hUKRRFCMIQvX/mF06cvY/HSpVx46eJ98p/e+GGuX3r+Iu57+F1cunjxPh0+fDgnTqzh4Qf2ctmShXzzz/fxxz95P3d98uQp3P/Q/dzz8P3c/fBDd6lQKEohCEMYPn3uPC5dupRr/+E9HDt2grVrV7HkyZPYuHFzrn39zGmce/5lHDt2nOufOXOaKxfPo/fee5drHzt2nHPnzufat2/fw5Ilc3nxxZfxxRefYPXqFezYsRcrV87j+vUruHDhApYuXcq9997rWlcoFEUIIQxD0F988RXWrl3LNWfPnsWqVXN4/PHHePDBB7l+8aLFHDx4iIULF3L16tUruH79eq4vW7ac5cuXc+2f//znXHvw4AG++OIL/POf/0yFQlEUQggD0E8//ZQb1qxZw1/+8heWL1/Ob3/721x748YNXH/u3Dk8+eST/PjHP+bq2bNnsWXLFq5fuXKlVChU/kIIYSgUvjNnzuDtt9/mjhdeeAFr167l2vXr1/PTTz/h559/ztdff80d//nPf/LVV1/x9NNPc/2LL77Ijz/+mO9+97u5/r59+/D9738/l544cQJbt25l586dXH/x4kUsXryYmzdv5qmnnuK5555zrcs/+clP+Oijj1i1ahXr1q1z5wMHDuS5557jmWee4dlnn+U73/kOlixZwsKFC7n6xIkT+ec//5mr9+7dw89//nO+/vrrfP3117n6Sy+9xNtvv803v/lNrn316lW+/vrrXH/48GFefvllvva1r3Hdd999l5deeokLFy5QrVDoHyGEIQR9++23uXb+/Hlee+01vvOd77Bu3TouXbqUCxcu5I4vvvgi9957L9d//vOf+fDDD7n2hx9+yPe//32uP3HiBJ599lmufe/ePdx3333cd999XLt7926uvW/fPhYvXszrr7/O6j/4wQ/405/+xLfffsu1a9eu4t577+Xyyy/H7NmzufrXX3/l2muXLufOO++sWiHw/yEEQRC+d+9ebl6xYgXXXnste/bs4b777mPatGnceeedXHfmzBnee+89fvSjH/Hwww/zm9/8hqt/+eWXeeihh9i4cSO/+MUv+Prrr/njH/9YtULgD4QQhOHLL7/k5j/84Q9ce+WV3HrrrVR76Uf94osvUnvp5z5C//7v/35P+UoUCoUiQhCGYRhC0L///e98+eWX+de//pVqT/3sZz+j2lM/e/bsKe9IUagUChVhhCAI+vnnn/nGN75Btad+9913v/eUr0ShUCgUhAghCPrHP/5Btad+4eLFf8pXohAodEIQhH7w4MFe+Ur+Q6FQKBQKIuQvUagUCkUhIEYQhcv5c+fwwx/+kGtefvkSVqxYwJIlS1myZAlLlixh8eLFvPbaa2zbts2NGzduYN26dZcuXcLcuXPYunUrS5YsYcGCBay9thpPP/00p59+Ote+ePEi1167di3Xnzp1ivvvv58HHniAe++9lw9/+MNcd9euXVy/di0PProXmzZt4oUXXmDp0qVceeWVPP300/zzn//M9W+88QZr1qxh8eLF/PrXv+bb3/423/nOdzh27BgnT55Mhe4jKBTKIYQQhC/uvPMOFqxYxJIlS1i6dCm//OUvefLJJzn22GO57rXXXuPaa69l586drF69mkWLFvHss88yc+ZMrl+/fj3f/e53+eY3v8mdd95J5aL/hUJx3iEI+ieffMKNq1evZuHChVx79dVXeeONN5g+fTofffQRn/vc57jqX/ziF7z55pucffbZfPjDH+bqjz/+OP/85z85+uij6fLwDy4UivMCIYRhCF999RUWLFjAD3/4Q65/9913+fOf/8xjjz3Gj3/8Yy699FLuvffe3Hv//fzpT3/i+nv27OHNt99m+fLlrFu3jpdeeomHH36YW2+9ldtvv52NGzcyderUrH/16lW+/vrrXH/16lXs2rUL69ato0L3EYg/yOUnQgiG/vDDD/nOd77DL37xi1xxxRVUa9Kne+++m/vvv59rf/fdd/z5z3/mtttu4+mnn+bbb7/lrbfeyhtvvEEF7yMIFGf9l770JdWe/sADD3DrrbeyatUq/vznP3P9/fv3p3KxI4RCcR4hCAIYfvCDH1Dv2fvuu4/f//73/M///I9rr7nmGqpfQ/kKFArF+YQQ/OMf/8j6Vz/96U/Ztm0bv//977l+/fr1XHfXXXdy9dVXU++p//Vf/+WBBx7ghhtu4Omnn6Za9yEUCuX6RCEIQhCG/va3v7Fu3TrWrl3LddeuXcu111zT/vSnP3H9gw8+SG2n/o9//CMA0uXmIgoFhS8QQhCGYRj6hRdeoNpT/+///s+tt95Kted+5JFH+MMf/kC1p77//vsJkK9EIVDoCCEIQhCGv/3tb9T79k8//ZRqT33//ffT7e7/U4VCUSgUhAghhK/85StUe+ovvfQSt9xyC/Wefcstt/DHf/wjlUtdIBSKEgJCCEIwhP7www/5xS9+wbVr167hvvvuY8stt3D9t9xyC9f+z3/+U2yU/yEIFGohBEEQhOHtt9/m5t9//31++ctfcsc1a9Zw5ZVXcsstt3D99evXc823336bb3zjG+yzzz4k9f9D/gsF7yEIwvDyyy/zy1/+kvuvv55f//rXuO6HH37IG2+8wVtvvcV7773H5Zdfzvvvv5/KxX5CIFDod4T+4x//SPWnPvroo9xyyy1Ue+p33nmHr776ikt/9dVXee+99/jJT35CtSc/+uijXH/ppZdyyy23cMstt3Dttddeyy+//JLnn3+e73//+9xxxx3cd999VFv+V1AoFAqFQiEgQhQKhUKhUBAgChUKhUKhECBCFIpCoVAoCASIUKFQKBQKBUKAClEoFAqFQkCEKBSFQqFQIBAgQhSKQqFQKAQEiFCoFAqFQkEACFEoFAqFQkCEKBSFQqFQKAQkRKEQEKJQKBQKhYAIFQqFQqFQEARCoVAoFIWCECEKhUKhUAgI+A+E0R8L4G8y9wAAAABJRU5ErkJggg==";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <img src="assets/images/rkslogo.png" alt="RKS Infotech Logo" className="h-14" />
        </div>
        <h1 className="hidden sm:block text-xl md:text-2xl font-bold text-brand-blue">
          Workshop Registration Portal
        </h1>
      </div>
    </header>
  );
};

export default Header;
