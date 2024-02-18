export function moveSvgIcon(attributes = "") {
  return `
      <svg class="ce-toolbar__settings-btn" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" ${attributes}>
      <path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 7.29999H9.4"></path><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 7.29999H14.59"></path><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.30999 12H9.3"></path><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 12H14.59"></path><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 16.7H9.4"></path><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 16.7H14.59"></path></svg>
    `;
}

export function editSvgIcon(attributes = "") {
  return `
      <svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" ${attributes}>
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <title/> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> </g> </g> </g> </g>
      </svg>
    `;
}

export function editTabSvgIcon(attributes = "") {
  return `
<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ${attributes}>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#000000"/>
</svg>
    `;
}

export function deleteSvgIcon(attributes, classes = "popup-btn delete") {
  return `
<svg class="${classes}" fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ${attributes}><path d="M20,7H12.309a.5.5,0,0,1-.447-.276L10.276,3.553A1,1,0,0,0,9.382,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V8A1,1,0,0,0,20,7Zm-4.793,8.793a1,1,0,1,1-1.414,1.414L12,15.414l-1.793,1.793a1,1,0,0,1-1.414-1.414L10.586,14,8.793,12.207a1,1,0,0,1,1.414-1.414L12,12.586l1.793-1.793a1,1,0,0,1,1.414,1.414L13.414,14Z"/></svg> 
`;
}

export const tabsSvgIcon = `
      <svg width="15px" height="15px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path fill="#444" d="M14 4v-2h-14v12h16v-10h-2zM10 3h3v1h-3v-1zM6 3h3v1h-3v-1zM15 13h-14v-10h4v2h10v8z"></path>
      </svg>
      `;

export const addTabSvgIcon = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 13V9C21 7.89543 20.1046 7 19 7H13.0704C12.4017 7 11.7772 6.6658 11.4063 6.1094L10.5937 4.8906C10.2228 4.3342 9.59834 4 8.92963 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H12" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M18 15V18M18 21V18M18 18H15M18 18H21" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`;

export const addImageSvgIcon = `
      <svg class="popup-btn add-img" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

export const addTextSvgIcon = `
<svg class="popup-btn add-text" fill="#000000" width="24px" height="24px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path class="clr-i-outline clr-i-outline-path-1" d="M31,21H13a1,1,0,0,0,0,2H31a1,1,0,0,0,0-2Z"></path><path class="clr-i-outline clr-i-outline-path-2" d="M12,16a1,1,0,0,0,1,1H31a1,1,0,0,0,0-2H13A1,1,0,0,0,12,16Z"></path><path class="clr-i-outline clr-i-outline-path-3" d="M27,27H13a1,1,0,0,0,0,2H27a1,1,0,0,0,0-2Z"></path><path class="clr-i-outline clr-i-outline-path-4" d="M15.89,9a1,1,0,0,0-1-1H10V3.21a1,1,0,0,0-2,0V8H2.89a1,1,0,0,0,0,2H8v5.21a1,1,0,0,0,2,0V10h4.89A1,1,0,0,0,15.89,9Z"></path>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
</svg>`;

export const addCodeBlockSvgIcon = `
<svg class="popup-btn add-code" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V9C21 9.55228 20.5523 10 20 10C19.4477 10 19 9.55228 19 9V4C19 3.44772 18.5523 3 18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H9C9.55228 21 10 21.4477 10 22C10 22.5523 9.55228 23 9 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM6.41421 7H9V4.41421L6.41421 7ZM18.7071 12.2929L22.7071 16.2929C23.0976 16.6834 23.0976 17.3166 22.7071 17.7071L18.7071 21.7071C18.3166 22.0976 17.6834 22.0976 17.2929 21.7071C16.9024 21.3166 16.9024 20.6834 17.2929 20.2929L20.5858 17L17.2929 13.7071C16.9024 13.3166 16.9024 12.6834 17.2929 12.2929C17.6834 11.9024 18.3166 11.9024 18.7071 12.2929ZM14.7071 13.7071C15.0976 13.3166 15.0976 12.6834 14.7071 12.2929C14.3166 11.9024 13.6834 11.9024 13.2929 12.2929L9.29289 16.2929C8.90237 16.6834 8.90237 17.3166 9.29289 17.7071L13.2929 21.7071C13.6834 22.0976 14.3166 22.0976 14.7071 21.7071C15.0976 21.3166 15.0976 20.6834 14.7071 20.2929L11.4142 17L14.7071 13.7071Z" fill="#000000"/>
</svg>
`;
