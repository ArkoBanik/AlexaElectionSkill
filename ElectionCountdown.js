exports.handler = (event, context) => {
    // TODO implement

    try{

    	if (event.session.new) {
		    // New Session 
		    console.log("NEW SESSION")

    	}

		switch (event.request.type){

			case "LaunchRequest":
				// launch Request
				console.log('LAUNCH REQUEST')
				//console.log(getJulianDay(11,3,2020) - getJulianDay(thisMonth,thisday,thisYear))
				context.succeed(
					generateResponse(
						buildSpeechResponse("Welcome to the election countdown",true),
						{}
						)
					)
				break;

			case "IntentRequest":
				//  Intent Request
				console.log('INTENT REQUEST')

				switch(event.request.intent.name){
					//event for asking for the day of the election
					case "GetDayOfElection": 
						context.succeed(
							generateResponse(
								buildSpeechResponse("The next Presidential Election of the United States is November 3rd, 2020",true),
								{}
								)
							)
						break;


					//event for asking for days till election 
					case "GetTimeTillElection": 
						//taking in todays date and turning it into usable data
						var today = new Date()
						var thisYear = today.getFullYear()
						var thisMonth = today.getMonth() + 1
						var thisday = today.getDate()
						//calculating the difference in days from todays date to the election
						var daysTill = getJulianDay(11,3,2020) - getJulianDay(thisMonth,thisday,thisYear)
						context.succeed(		
								generateResponse(
									buildSpeechResponse("The next Presidential Election of the United States is " + daysTill + " days away",true),
									{}
									)
								)
						break;


					case "GetDaysFromDate": 
					//converting input date to usuable date var
					var dayFrom = new Date(event.request.intent.slots.FromDate.value)
					var daysBetween = getJulianDay(11,3,2020) - getJulianDay(dayFrom.getMonth()+1,dayFrom.getDate(),dayFrom.getFullYear())
					context.succeed(
							generateResponse(
								buildSpeechResponse("The next Presidential Election of the United States is " + daysBetween + " days away from that date",true),
								{}
								)
							)


						break;

					default:
					context.succeed(
							generateResponse(
								buildSpeechResponse("I did not recognize that however, the next Presidential Election of the United States is November 3rd, 2020",true),
								{}
								)
							)

				}
				break;

			case "SessionEndedRequest":
				// Session Ended Request
				console.log ('SESSION ENDED REQUEST')
				break;

			default:
				context.fail('INVALID REQUEST TYPE: $:event.request.type}')
		}




    } catch(error) {context.fail('Exception: ${error}')}
    

    
  


    //callback(null, 'Hello from Lambda');
}


buildSpeechResponse = (outputText, shouldEndSession) => {

	return{
		outputSpeech:{
			type: "PlainText",
			text: outputText
		},
		shouldEndSession: shouldEndSession

	}

}

generateResponse = (sessionAttributes, speechletResponse) => {

	return{
		version: "1.0" ,
		sessionAttributes: sessionAttributes,
		response: speechletResponse
	}
}

//calculates the Julian date equivalent of gregorian date input
getJulianDay = (month, day, year) =>{

	var a = Math.floor((14-month)/12 )
	var y = year + 4800 - a
	var m = month + (12*a) -3

	return day + Math.floor( (153*m +2)/5) + (365*y) + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) -32045

}