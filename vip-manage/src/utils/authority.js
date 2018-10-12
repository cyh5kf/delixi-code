// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('userInfo');
}

export function setAuthority(data) {
  return localStorage.setItem('userInfo', JSON.stringify(data));
}

export function removeAuthority(){
  localStorage.clear();
}


export function settoken(data) {
  return sessionStorage.setItem('token', JSON.stringify({token:data}));
}

export function gettoken() {
  return sessionStorage.getItem('token');
}

export function setMenu(data) {
  return localStorage.setItem('mymenu', JSON.stringify(data));
}

export function getMenu() {
  if (!localStorage.getItem('mymenu')) {
    // window.location.hash = '#/exception/302'
  }
  if (!localStorage.getItem('mymenu')) {
    setTimeout(()=>{
      if (!localStorage.getItem('mymenu')) {
        window.location.hash = '#/exception/404';
      }else{
        window.location.reload();
      }
    },1000)
  }
  return localStorage.getItem('mymenu');
}