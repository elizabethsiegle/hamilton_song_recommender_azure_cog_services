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
	"non-stop": {
		desc: "You work a lot. You work too hard and do not sleep much, but it is how you get ahead. Keep pushing forward, maybe take some risks.",
		link: "youtube.com/watch?v=_YHVPNOHySk"
	},
	"wait for it": {
		desc: "Lost, doubtful, confused, maybe sad or down, and you do not know what to do? Good things take time. You will get praise, recognition, and validation soon. If you're doubting yourself, just keep going. You are inimitable, an original.",
		link: "youtube.com/watch?v=ulsLI029rH0"
	},
	"schuyler sisters": {
		desc: "Girl power! Queens. Sisters. You are empowered and thus empower others. Keep your siblings and friends close. You may be looking for a significant other, a friend, a peer, or a general mind at work.",
		link: "youtube.com/watch?v=UeqKF_NF1Qs"
	},
	"dear theodosia": {
		desc: "You get teary over your kid or your pet like when your dog is sleeping. They are cute, young, innocent, and have their whole lives ahead of them, which you will make better.",
		link: "youtube.com/watch?v=TKpJjdKcjeo"
	},
	"story of tonight": {
		desc: "You may be emotional over what you, your friends, and your family will do in the future. The night is still young. You can all do so much and change the world!",
		link: "youtube.com/watch?v=3vqwrepaMR0"
	},
	"my shot": {
		desc: "You may be confused or unsure. Life is tough but you are tougher. All you need is one chance, one shot, and you do not know what to do right now. Well here is the inspiration and motivation you need to accomplish anything.",
		link: "youtube.com/watch?v=Ic7NqP_YGlg"
	},
	"alexander hamilton": {
		desc: "You save time by reading summaries. You do not get the hype over Alexander Hamilton or know the story. Hamilton may be new to you. This song will sum it up succinctly for you and you'll learn some history too.",
		link: "youtube.com/watch?v=VhinPd5RRJw"
	},
	"what'd i miss?": {
		desc: "This is upbeat. You are jaunty but oblivious and ignorant, avoiding conflict. You show up late. You may have missed the first half, but, like Thomas Jefferson, you have style.",
		link: "youtube.com/watch?v=vrnovNWC1f4"
	},
	"your obedient servant": {
		desc: "it's okay to be petty and passive-aggressive sometimes. Some people are annoying and get on your nerves. I mean, who doesn’t have an itemized list of thirty years of disagreements.",
		link: "youtube.com/watch?v=Yr-mO1o1uHk"
	},
	"helpless": {
		desc: "You are preoccupied with love. Did you just swipe right and match with someone beautiful, making your heart flutter and speed up? It is exciting!",
		link: "youtube.com/watch?v=PwNt3A-jScQ"
	},
	"burn": {
		desc: "Sometimes the world seems like it is on fire and you need to curse someone who has wronged you (and you are in the right). Why do good people do dumb things? I hope they burn.",
		link: "youtube.com/watch?v=a0k0FJrY4a8"
	},
	"take a break": {
		desc: "You are obsessed with punctuation and put in a lot of hours at work. If someone invites you, go with them. Chill. It is time to relax, take a break, go to the beach, and sleep with people who care about you.",
		link: "youtube.com/watch?v=D2UWNF8pKwk"
	},
	"the room where it happens": {
		desc: "You want to be included. You want a seat at the table. Maybe you are missing out on something. Ignore those people. Ignore the haters.",
		link: "youtube.com/watch?v=WySzEXKUSZw"
	},
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
            var obj = {"positive": pos, "negative": neg, "neutral": neutral};
            max = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
        });
    });
   
    //Build our Bayesian model
    var whichfw = new WhichX();
    whichfw.addLabels(["non-stop", "wait for it", "schuyler sisters", "dear theodosia", "story of tonight", "my shot", "alexander hamilton", "the reynolds pamphlet","what'd i miss?",
    "your obedient servant", "helpless", "burn", "cabinet battles", "take a break", "the room where it happens"]);
    Object.keys(songs).forEach((s) => { whichfw.addData(s.toLowerCase(), songs[s].desc) } );
    const song = whichfw.classify(event.Body); 
    const reasonWhySong = songs[song].desc;
    const link = songs[song].link;
	twiml.message(`You seem to be feeling ${max}. ${reasonWhySong} We recommend listening to ${song} right now: ${link}`);
	callback(null, twiml);
};