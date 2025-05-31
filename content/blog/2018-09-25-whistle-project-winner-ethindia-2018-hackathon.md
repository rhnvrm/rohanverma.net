+++
title = "Whistle Project – Winner EthIndia 2018 Hackathon"
date = "2018-09-25T10:45:25+00:00"
path = "blog/2018/09/25/whistle-project-winner-ethindia-2018-hackathon/"

[extra]
  author = "Rohan Verma"
+++

<iframe width="100%" height="480" src="https://www.youtube.com/embed/-9jnaQEjC1Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Recently I took part in EthIndia Hackathon that took place in Bengaluru. This time I was participating without a team after a long time and made a team on the day of the event. All three of us (Ronak, Ayush and I) had a different idea of what we should work on but we finally came to a consensus on an idea that I had got from my current workplace&#8217;s CTO (Kailash Nadh). He had discussed a problem statement where he wanted to distribute asset holding information of people who have demised to their family members. This is a common task called the Dead Mans Switch which has been covered in a lot of movies as well as various experimental ideas. This was a big problem to solve, not only in size but also in the number of question marks it raises. After a lot of discussion with various mentors from the Ethereum community we decided and implemented upon the following idea by reducing the scope (instead of covering all assets, stick to only sending videos through IPFS) and deciding to skip the big issues like (missed heartbeats)

Whistle &#8211; A platform to empower Whistleblowers and those who live under constant fear of death. Using smart contracts and the NuCypher proxy re-encryption MockNet we store the re-encrypted ipfs hash of the recorded video on the smart contract which can be interacted with using our heartbeat function interface which resets the decryption timer to a future date. In case a heartbeat is missed, the contract triggers emails containing the decrypted ipfs hash containing the video which can be streamed by anyone else.

The best part about the event was the mentorship which guided us throughout the duration of the hackathon. We learnt that any good product, needs a few use cases which it is trying to solve and it should solve those perfectly. Based on those lines, we did a bit of research and found a bit more about this issue. Recently, Latifa Al Maktoum, a woman belonging to the royal family of Dubai, ran away and came to India as she was being tortured and drugged. She released a video on youtube, where she tells her viewers that if they are watching this, she might already be dead!

<iframe width="100%" height="480" src="https://www.youtube.com/embed/UN7OEFyNUkQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Using a unique combination of heartbeat transactions and the NuCypher MockNet, we can enable them to allow decryption of the video only after their demise. We also integrated a small platform on top, through which whistleblowers can assign receipients such as news agencies. Then the recipients stored on the contract can be sent emails with the link of the data stored on IPFS once the video&#8217;s hash stored on the contract is decrypted using our method. A few other examples are people who may be related to influential families or groups, ex-members of cults, people stuck in legal loopholes, or someone who is just afraid that they may die before publishing their findings, such as a whistleblower. In India, there are multitudes of cases, one such example is the Vyapam scam where &#8220;[more than 40 people associated with the scam have died since the story broke in 2013][1]&#8221; many of whom were critical witnesses and whistleblowers whose testimony was lost due to their murder. Our platform, Whistle, hence enables users of our application, to anonymously, store information until their demise.

We needed to define our users to allow us to reduce the scope of the product. Targeting people under immediate threats who may not be able to trust any centralized organization which could censor their message.   It is important for them to although, keep their message hidden until their demise, as then they can leverage this as a position. Through using our platform, the individual could essentially, release all the information even after their demise (checked by not sending a heartbeat message) by sending an email with the files stored on IPFS to all major news outlets. By limiting ourselves to whistleblowers, we were able to solidify our projects appeal. We decided that we wanted to empower such individuals and whistle blowers who live under a constant fear of death, to utilize the decentralized blockchain and store encrypted data on the blockchain.

The most critical technology of our platform is the NuCypher network. Through this network, we are able to perform proxy reencryption and run a read only function written in our contract to detect the &#8220;is alive&#8221; criteria. The smart contract stores all the details required to securely decrypt such as the policy_id which is required by the NuCypher mocknet, along with a function that can be run by the mocknet to detect if the state on the chain is in agreement with our condition, that the last heartbeat should have been before the current time. (We update this whenever the user checks in with a time in the future).  
We ran into a multitude of problems like understanding and going through the codebase of NuCypher Mocknet and the demos they shared. It was a challenging task but we are proud to be able to have implemented the architecture that allowed us to perform off the chain decryption based on a condition stored on chain. Being able to implement the heartbeat contract and the flow of required to perform the decryption only after the condition was met was interesting. Finally, interacting with smart contract deployed on private chain to make a consolidated product was in itself a challenge. We originally tried to use the embark platform and wanted to make a [_Status.im_][2] bot that would query for the heartbeat transaction directly through a message in the chat. But due to a multitude of reasons, such as deprecation of the _/debug_ console command we are not able to go through with this.   

You can go through the following repositories to understand a bit more about the project:  
<a href="https://github.com/siftbox/File-Encrypt-IPFS-Solidity" target="_blank" rel="noreferrer noopener">https://github.com/siftbox/File-Encrypt-IPFS-Solidity</a>  
<a href="https://github.com/siftbox/File-Encrypt-IPFS-Platform" target="_blank" rel="noreferrer noopener">https://github.com/siftbox/File-Encrypt-IPFS-Platform</a>  
<a href="https://github.com/CapsLockHacks/nucypher-mocknet-api" target="_blank" rel="noreferrer noopener">https://github.com/CapsLockHacks/nucypher-mocknet-api</a>  
<a href="https://github.com/Ronak-59/Alive.Network-Frontend/" target="_blank" rel="noreferrer noopener">https://github.com/Ronak-59/Alive.Network-Frontend/</a>

<a href="https://github.com/Ronak-59/Alive.Network-Frontend/" target="_blank" rel="noreferrer noopener"></a>

<a href="https://github.com/Ronak-59/Alive.Network-Frontend/" target="_blank" rel="noreferrer noopener"></a>

 [1]: https://www.firstpost.com/india/mystery-of-vyapam-scam-the-death-toll-keeps-increasing-in-indias-killer-scandal-2316888.html
 [2]: http://Status.im