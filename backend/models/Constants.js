module.exports.DEVICE = Object.freeze({   
    IOS     	  		  : 1001,
    ANDROID      		  : 1002
  });
  
  module.exports.LOGGEDIN_RESULT = Object.freeze({   
    ALREADY_REGISTERED_WTIH_SOME_DEVICE					: 2001,
    WRONG_CRED      		  							        : 2002
  });

  module.exports.DEVICE_STATUS = Object.freeze({
  	DEVICE_NOT_INSERTED									: 3001,
    DEVICE_INSERTED_TO_DB								: 3002
  })