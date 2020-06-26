const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
exports.handler = async function(context, event, callback) {
	let twiml = new Twilio.twiml.MessagingResponse();
	const key = context.AZURE_KEY_HAMILFILM;
	const endpoint = context.AZURE_ENDPOINT_HAMILFILM;
	const WhichX = require("whichx");
	const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));
	const input = [
        event.Body
    ];
    
    const songs = {
        "non-stop": "Okay girl, time to get your sh!t together and do some work. You've been dawdling and procrastinating, but enough is enough.",
        "wait for it": "I know, times are tough. Good things take time. If you're doubting yourself, just keep going.",
        "schuyler sisters": "girl power. #werk",
        "dear theodosia": "you're getting all emotional over your kid or your pet",
        "story of tonight": "You're feeling emotional over what you, your friends, and your family will do in the future, may be getting a bit teary-eyed but in a happy way.",
        "my shot": "here's the motivation you need to accomplish anything",
        "alexander hamilton": "You don't get the hype over Hamilton. This song will sum it up succinctly for you and you'll learn some history too.",
        "the reynolds pamphlet": "your archnemesis lost or is down. Someone you don't like was knocked out of the race. This may make you smile, but remember, they are down but not quite out.",
        "what'd i miss": "For a 10am meeting, you show up at 10:10am with coffee. You may have missed the first half, but you've got style, like Thomas Jefferson.",
        "your obedient servant": "it's okay to be petty and passive-aggressive sometimes. I mean, who doesn’t have an itemized list of thirty years of disagreements",
        "helpless" : "Did you just swipe right and match with your love du jour? Helpless is for you! https://www.youtube.com/watch?v=PwNt3A-jScQ",
        "burn": "Sometimes you need to curse someone who has wronged you (and you are in the right). I hope they burn.",
        "cabinet battles": "Why can't people compromise? Can't we all just be friends?",
        "take a break": "I, too, am sometimes obsessed with punctuation. While we're at it, I'm also a fan of grammar and the Oxford comma.",
        "the room where it happens": "Are your best friends keeping something from you? Is your work team walking on egg shells around you? Maybe they kept you from the room where it happens.",
    };
    
    const sentimentResult = await textAnalyticsClient.analyzeSentiment(input);
    let sentiment, pos, neg, neutral, max;
    
    sentimentResult.forEach(document => {
        console.log(`ID: ${document.id}`);
        console.log(`Document Sentiment: ${document.sentiment}`);
        console.log(`Positive: ${document.confidenceScores.positive.toFixed(2)} Negative: ${document.confidenceScores.negative.toFixed(2)} Neutral: ${document.confidenceScores.neutral.toFixed(2)}`);
        document.sentences.forEach(sentence => {
            sentiment = sentence.sentiment;
            console.log(`Sentence sentiment: ${sentiment}`);
            pos = sentence.confidenceScores.positive.toFixed(2);
            neg = sentence.confidenceScores.negative.toFixed(2);
            neutral = sentence.confidenceScores.neutral.toFixed(2);
            var obj = {"pos": pos, "neg": neg, "neutral": 1};
            max = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
            console.log(`Positive: ${pos} Negative: ${neg} Neutral: ${neutral} Max: max`);
        });
    });
   
    //Build our Bayesian model
    var whichfw = new WhichX();
    whichfw.addLabels(["non-stop", "wait for it", "schuyler sisters", "dear theodosia", "story of tonight", "my shot", "alexander hamilton", "the reynolds pamphlet", "what'd i miss", 
    "your obedient servant", "helpless", "burn", "cabinet battles", "take a break", "the room where it happens"]);
    Object.keys(songs).forEach((s) => { whichfw.addData(s.toLowerCase(), songs[s].toLowerCase()) } ); 
    const song = whichfw.classify(event.Body); //input[0]);
    const reasonWhySong = songs[song];
    console.log(`song ${song}`);
	twiml.message(`We detected the Hamilton song you need to listen to right now is ${song} because ${reasonWhySong}.`);
	callback(null, twiml);
};