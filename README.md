Receive a recommended Hamilton song according to your mood and how you're feeling!

![SMS IMAGE](https://lh4.googleusercontent.com/RaUdMEAol9gDXPfdww_54rEiHnfp59IOVUr3oZBGm1UbmzLk6YVtZkz3TSt7EtRViMlPypzUY7kcasv83O66WkX45YH6IBcehCyecKr2r48WQm9zgsya4_sT2QEPnw_nYUvX6EDw)
This SMS chatbot uses machine learning with [Microsoft Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services) and [Naive Bayes](https://en.wikipedia.org/wiki/Naive_Bayes_classifier) to recommend the Hamilton song most relevant to you right now. Test it yourself: the longer your message on how you are feeling is to +13364295064, the more data it has to analyze what Hamilton song you need now!

You will need:
A Twilio account - [sign up for a free one here and receive an extra $10 if you upgrade through this link](http://www.twilio.com/referral/iHsJ5D)
A Twilio phone number with SMS capabilities - [configure one here](https://www.twilio.com/console/phone-numbers/search)
Microsoft Azure - [make a free account here if you don't have one already](https://azure.microsoft.com/en-us/free/cognitive-services/)

You will need an Azure key and endpoint to use Azure Cognitive Services. Follow the [directions here to create a Cognitive Services resource using the Azure services portal](https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account).
![Azure Cog Services Resource](https://lh4.googleusercontent.com/mu9Y4ts1Zh_IxZrSMoYtvsRvrstEhC9SojHW88Gqsll0FQfW1kErqD6QMQtzl2Si5nVfBaoObNR1BLcaNEr_X1RCkzPnxQ4AX8yixeK9-WzlNaeIlAX1Ucr_uxr3L_zcUIahPRQs)

Grab the endpoint and a key:
![Azure key, endpoint](https://lh6.googleusercontent.com/81WQ1LTVv8HeSCgaAXFnAycM_d-s9Ic6J1fdyjgutVSbgmBTyr0PqSOkIYWTBe8kOlGzcrQPKNlNN-8Zj_0IBR0OceG62X-VEAgiq4GFvIqcBUcAAWNMoPl7msocqdkr8YLup2q8)

## Configure and make a Twilio Function with Azure
[Configure your Twilio Functions](https://www.twilio.com/console/functions/configure) with your Azure endpoint and key as environment variables.
![configure img](https://lh5.googleusercontent.com/nFTZvm7oor5FAUONsF16SMSJD1wfjNGZfo-rQEHcxJA_dBh0UNwcZGqv2p-32yLFWuHjGDfVQXIGBuyKlb3A5kTXHp2zozuB0738mKUZ6c4mo9LvJti85OqAvX6YdU8DrKkj4lOS)
Then add the dependencies `@azure/ai-text-analytics 1.0.0` and `whichx *` as shown below. Whichx, a naive Bayesian classifier, can succinctly and cleanly analyze data. You can [read more on Naive Bayes here](https://www.twilio.com/blog/top-5-ml-algorithms-to-know).
![add dependencies to Functions](https://lh5.googleusercontent.com/zh6FQcIq_hcNxESm1ZMBvxMXbQEMzIknGadvbg4Gd1rFZML4yIDK0pD9NLZpisDgDpjZBa09nH4QAMKxF1qWgYQt_pRwXvlP8GeXWn0E4ja3Z9Dzl2VdmDnvUDz_ZshtthunnG_S)
Click `Save` and you can now use Azure AI Text Analytics and reference your Azure endpoint and key in any of your Twilio Functions!

On the left-hand panel underneath Functions, click `Manage`. To make a new Function, click the red plus button and then select a Blank template followed by Create.
![new Func template](https://lh4.googleusercontent.com/leEwIBkog_8xK9pwZ7qZdzjGXhWD3DLKDB6gcBHPuRGTsJjeHBzivAGs2ADoxi9b6KIm0r4hOBDv1ny3ZzD6g9ewTSgxDCcFRQSuq8Bbnz-QZvg0_dTByvMhBFFPtvkeVfBIYz1k)

Then add the code in `index.js` to your new Twilio Function!

## Configure your Twilio Phone Number with a Twilio Function
If you don't have a Twilio number yet, go to the [Phone Numbers section of your Twilio Console](https://www.twilio.com/console/phone-numbers) and search for a phone number in your country and region, making sure the SMS checkbox is ticked.
![img number](https://lh4.googleusercontent.com/uJ97r2MnVtFNUd-lePqByNijDacVeAWT7gDOdFtT5lfwmxGwofLsNddW2PiQofLIg2uP297MQS8iXAoHCj7hDNzMGJyuDp2fzlnK3SFgQDr12R1wjxYf5u7XcSF4yqk2indRAzqI)

In the <em>Messaging</em> section of your purchased number, in the <em>A Message Comes In</em> section, set the dropdown menu to Function instead of Webhook and then on the right select your Function from the larger dropdown menu, as shown below. Hit <em>Save</em>.

![configure #](https://lh6.googleusercontent.com/YdgwT2ZaE4swH6KaULRQEPl-MNCnSYpy5VbAG8DlLXNJ2ry8CXCCSaYUmxgHWT6sz0EQhnA0H9Qi-R2LyhfuCsaRw-zBWBylISNUQFXSoi8H3ed0dXlsaUCVZhLSH7OLFv3EpsKQ)
Text your number and tada!
![text img 2](https://lh5.googleusercontent.com/cnMpHM_MKl6F00gMKfpgFaHnbC7YY6gCJB7Cp6uleXzNEzgas2siZkXEnaxWznd4I29IYehcSD-96TWt0kwiH2gbhiSp767086S7BBVrD6xoNtco6dOPLtyc4H_NWrexasyn6qLv)

