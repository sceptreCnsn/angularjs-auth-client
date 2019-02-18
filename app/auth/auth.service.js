(function() {
  angular.module('app').service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', '$timeout'];
  function authService($state, angularAuth0, $timeout) {
    function login() {
      angularAuth0.authorize();
    }

    function handleAuth() {
      angularAuth0.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          setSession(authResult);
        }
      });
    }

    function setSession(authResult) {
      console.log(authResult);
      var expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );

      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);

      var profile = {
        name: authResult.idTokenPayload.name,
        nickname: authResult.idTokenPayload.nickname,
        picture: authResult.idTokenPayload.picture
      };
      localStorage.setItem('profile', JSON.stringify(profile));
    }

    function logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
    }

    function isAuthenticated() {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    return {
      login: login,
      logout: logout,
      handleAuth: handleAuth,
      isAuthenticated: isAuthenticated
    };
  }
})();
