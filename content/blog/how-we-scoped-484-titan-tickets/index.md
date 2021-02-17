---
title: How we estimated 484 Titan Travel Trello Tickets
date: "2021-02-16"
description: At Titan Travel we had a big scope for our discovery phase. We were asked to create a roadplan with time estimates for a fully greenfield website rebuild of their existing website. In this article I walk you through how we managed it using a useful plugin and some Excel magic.
author: [Sam Hopkins]
type: Blog
tags: ['Estimating']
---

#### Introduction
At Titan Travel we had a big scope for our discovery and PoC phase. We were asked to create a roadplan, with time estimates, for a fully greenfield website rebuild. This equated to 484 tickets which we had to prioritise, technically validate and create estimates for.

In this 2min read I am going to walk you through how we did this. I hope this will help others who find themselves in similar positions in the future.

#### How we did it:

1. **Captured requirements in Trello:**
We found Trello the easiest and quickest tool for us to capture requirements in. It's flexible and simple to use and easy to gain access to, which is not always easy at the start of a project

1. **Labels:** labels are the key to start sorting the tickets, we added labels for:
    - **[MOSCOW](https://en.wikipedia.org/wiki/MoSCoW_method) Prioritisation on all tickets:**
    In our case, MUSTs were for priorities out of user testing as well as features that were existing on the current website. In most cases if it was not already on the website it was automatically a "SHOULD"
    - **T-shirt sizing - XS, S, M, L, XL:**
    Not all stories had requirements granular enough to be able to measure complexity and therefore story points. Also story points should only be calculated once the full developer team is in place. Therefore, for now, the best we could do was a 'finger in the air' size estimate. I would also recommend asking another senior dev to look over some of these estimates with you. Both for yours and the clients piece of mind - thanks @Graz!

1. **Best and Worst case time estimates for t-shirt sizes:**
In order to carry out some high level roadmapping and planning, we had to get some idea of the time it takes to develop these tickets. We did this with the following table where each t-shirt size had a best and worst case scenario time estimate:

| Size | Best Case (days) | Worst Case (days) |
|:----:|:----------------:|:-----------------:|
| XS | 0.5 | 1 |
| S |	1	| 2.5 |
| M |	2.5 |	5 |
| L |	5 |	10 |
| XL |	10 |	20|

4. **Extract using Trello Plugin:**
This [CSV Export for trello](https://chrome.google.com/webstore/detail/csv-export-for-trello/nlclhmcmfjpmmngpopdgapiccfddfagi) plugin for Chrome was a great find. With a couple of clicks you can get all these trello tickets exported in .csv format

4. **Load into Google sheets:**
Or MS Excel, but nobody likes Microsoft.. Except maybe @Jonnie

4. **Some Excel/Google Sheet magic:** Once you have the data in table format you can start tallying up the tickets using some excel wizardry, many thanks to our resident excel wizard @Mike Steel for the help with this. The bit of magic that you need involves a few "COUNTIFS"

```=SUM(
  (
    COUNTIF('Titan Search Requirements'!K:K,"*MUST*Size:M*") +
    COUNTIF('Titan Search Requirements'!K:K,"*Size:M*MUST")
  )
  *'Data Sheet - T-shirt Sizes'!B2)
````

*Note: you need 2 "COUNTIFS" to handle the different ways round the labels could have been ordered, this get's even more tricky when you have more labels*

7. **Add calculations together into a table:** Then we brought together all the caclulations into an easy to read and easy to break down table:

![Estmations Table](estimate_example.png)

7. **Factor in Contingency for unknowns:** We are never going to capture all the tickets in this discovery phase. As I am sure you have all experienced you are always uncovering more tickets during delivery. After speaking to Service Delivery, 35% is a tried tested percentage contingency to add to try and account for these unknowns

7. **Working out a usable total:** So now you have a range of Total Dev days. But we need to try and get to the most accute timeframe we can. First we take an average of this range then we start breaking into real time.
    - First we divide by number of Devs. Myself, as Tech Lead, only counts for at most 1/2 a Developer. I need to give myself time to be able to support other devs and also the wider project in meetings etc
    - Then we break down into days. We say that a month is 18 days. This factors in vactions and illnesses

![Totals Table](totals.png)

9. **Rince and Repeat:** We had 7 Trello boards full of tickets, one for each of the 5 major epics, one for the non-functional requirements (incl platform build) and one for Filemaker Database work we were dependent on. However, once we had done one of these trello boards, the others were relatively simple.

#### Conclusion:

In my view estimating tickets like this in order to create timelines is the most difficult and dangerous thing you will be asked to do as a senior developer/ tech lead. I would always recommmend going about it in a measured, understandable and repeatable way clearly explaining to all parties how you got to the end result.

Many thanks for reading, I hope this helps!