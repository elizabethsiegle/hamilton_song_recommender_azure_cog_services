const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
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
            desc: "Do not assume you are the smartest in the room. Time to do some work.",
            link: "youtube.com/watch?v=_YHVPNOHySk"
        },
        "wait for it": {
            desc: "Good things take time. If you're doubting yourself, just keep going. You are inimitable, an original.",
            link: "youtube.com/watch?v=ulsLI029rH0"
        },
        "schuyler sisters": {
            desc: "Girl power! You are empowered and thus empower others. Keep your siblings close. You may be looking for a mind at work.",
            link: "youtube.com/watch?v=UeqKF_NF1Qs"
        },
        "dear theodosia": {
            desc: "you're getting all emotional and teary over your kid or your pet. They're cute and have their whole lives ahead of them, which you will make better.",
            link: "youtube.com/watch?v=TKpJjdKcjeo"
        },
        "story of tonight": {
            desc: "You're feeling emotional over what you, your friends, and your family will do in the future.",
            link: "youtube.com/watch?v=3vqwrepaMR0"
        },
        "my shot": {
            desc: "life is tough but you are tougher. All you need is one chance, one shot per se, and here's the motivation you need to accomplish anything.",
            link: "youtube.com/watch?v=Ic7NqP_YGlg"
        },
        "alexander hamilton": {
            desc: "You don't get the hype over Hamilton. This song will sum it up succinctly for you and you'll learn some history too.",
            link: "youtube.com/watch?v=VhinPd5RRJw"
        },
        "the reynolds pamphlet": {
            desc: "have you read this? your archnemesis lost or is down. Someone you don't like was knocked out of the race. They are down but not out.",
            link: "youtube.com/watch?v=uYQPP49MSEk"
        },
        "what'd i miss?": {
            desc: "Where have you been? For a meeting, you show up late with coffee. You may have missed the first half, but, like Thomas Jefferson, you have style.",
            link: "youtube.com/watch?v=vrnovNWC1f4"
        },
        "your obedient servant": {
            desc: "it's okay to be petty and passive-aggressive sometimes. I mean, who doesn’t have an itemized list of thirty years of disagreements.",
            link: "youtube.com/watch?v=Yr-mO1o1uHk"
        },
        "helpless": {
            desc: "Did you just swipe right and match with your love of the day, making your heart go boom? Don't be down for the count and helpless because nothing is for sure.",
            link: "youtube.com/watch?v=PwNt3A-jScQ"
        },
        "burn": {
            desc: "Sometimes you need to curse someone who has wronged you (and you are in the right). Why do good people do dumb things? I hope they burn.",
            link: "youtube.com/watch?v=a0k0FJrY4a8"
        },
        "cabinet battles": {
            desc: "Why do people not compromise? Can we all just be friends? Figure it out, that is an order from your commander. But also, rap battles are very fun.",
            link: "youtube.com/watch?v=dSYW61XQZeo"
        },
        "take a break": {
            desc: "You are obsessed with punctuation and thus by extension grammar and Oxford commas. We stan an intellectual but it is time to relax, take a break.",
            link: "youtube.com/watch?v=D2UWNF8pKwk"
        },
        "the room where it happens": {
            desc: "You are being left out, excluded. Are your friends keeping something from you? Is your work team walking on egg shells around you? Maybe you are missing out on something.",
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