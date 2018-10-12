// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('userName');
}

export function setAuthority(data) {
  return localStorage.setItem('userName', JSON.stringify(data));
}

export function settoken(data) {
  return sessionStorage.setItem('token',JSON.stringify({token:data}))
}

export function gettoken() {
  return sessionStorage.getItem('token')
}

export function setMenu(data) {
  return sessionStorage.setItem('menu',JSON.stringify(data))
}

export function getMenu() {
  // if (!localStorage.getItem('menu')) {
  //   widow.location.hash = '#/exception/302'
  // }
  if (!sessionStorage.getItem('mymenu')) {
    setTimeout(()=>{
      if (!sessionStorage.getItem('mymenu')) {
        window.location.hash = '#/exception/302';
      }else{
        window.location.reload();
      }
    },500)
  }
  return sessionStorage.getItem('mymenu')
}


export function removeAuthority(){
  localStorage.clear();
}
