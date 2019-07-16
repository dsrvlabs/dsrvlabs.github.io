---
title: "[Luna] Report of double-Sign Slashing in Terra network"
date: 2019-07-16 15:22:00 +0900
categories: blog news
comments: true
---

# [Luna] Report of double-Sign Slashing in Terra network

> 2019-07-16  
> nonce - LunaWhale.com  
> English : [Doc](https://www.dsrvlabs.com/blog/news/Luna_Report_of_double-Sign_Flashing_in_Terra_network/) | [Github](https://github.com/dsrvlabs/dsrvlabs.github.io/blob/master/_posts/2019-07-16-Luna_Report_of_double-Sign_Flashing_in_Terra_network.md)  
> Korean : [Doc](https://www.dsrvlabs.com/blog/news/Luna_Report_of_double-Sign_Flashing_in_Terra_network/) | [Github](https://github.com/dsrvlabs/dsrvlabs.github.io/blob/master/_posts/2019-07-16-Luna_Report_of_double-Sign_Flashing_in_Terra_network.md) 

## 1. Summary

#### 1-1. Problem Description
- Date : 7/11/2019 01:40 UTC-Zero
- Block height : 474404
- Slashing Evidence : double sign
- Validator Moniker : "nonce - LunaWhale.com" ("15626A98542EE659662EA5B4431F48328045619F")

#### 1-2. Penalty
- Our validator node was disqualified from Block #474407.
- 1% stake slashed (102,466 Luna) by network.


#### 1-3. Slashing Cause
- History: Double signed evidence in Block #474405
- One validator signed two different blocks in the same height 
  - First Block : "2A8FD8728530B1C5190321B31889C1E9748B5BD86B020884344F10DE52883E91" (2019-07-11T01:40:55.988225325Z)
  - Second Block : "C1CCCAC31C21F8D08918B5450F2B45A90046F87EDDEFC68AEB9AE30B2FACEC00" (2019-07-11T01:40:56.07990156Z)
- Mainnet votes on the first block and approves that block.


## 2. Background

We detected an abnormal node failure at July 8 2019.

<img width="842" alt="01" src="https://user-images.githubusercontent.com/897510/61271099-9d96e100-a7de-11e9-8571-e79b13d69c1a.png">
> (File descriptor limit caused three-hours-long node downtime)

#### 2-1. Abnormal process termination reason

- File descriptor limit was reached when the REST-API service for LunaWhale service is up, 
- Then terrad was terminated abnormally.

#### 2-2. Status
- We found a too-many-file-opened error in a terrad log
- Might Cause by frequent query from our web service

#### 2-3. Take Action
- Temporal: Increase fd_max 1024 to 4096
- Fundamental: Setup 2 nodes and separate role to Validator/Data



## 3. Accident history

#### 3-1. Take Internal tech-review for new data node to prevent accident

- No balance setup for vote power down
- No validator transaction sending
- Make new operator key using terra-cli
- We guess it is enough to prevent issue

#### 3-2. Starting new-node setup
- Brand new nodes used to experience many sync failures (due to a genesis file and configurations) 
- **Copy “.terrad” folder from validator node to avoid sync issue**
- After new sync done, double sign occured 
 
#### 3-3. Result
- Not enough to work as a luna validator
- Tendermint decided our new node as a validator, because we use the same *validator*.json files
- A double-sign happened.



## 4. Details - Code Level

How Tendermint consensus algorithm uses replicated <code>priv_validator_key.json</code> and `priv_validator_state.json` files against our intention?


#### 4-1. How can terrad sign a block while it is not a validator?

<img width="869" alt="02" src="https://user-images.githubusercontent.com/897510/61271100-9d96e100-a7de-11e9-8f0d-5184a704ee01.png">
> (Node Initialize with key files)

Because `priv_validator_key.json` and `priv_validator_state.json` files exist, Tendermint does not generate a validator key but reuse it.

When a node starts, it reads two files and updates its validator information (in `ConsensusState`).

<img width="935" alt="03" src="https://user-images.githubusercontent.com/897510/61271101-9e2f7780-a7de-11e9-9e4b-ae2ca50889e6.png">

Our new test node turned to use the validator key of the old validator node.

<img width="953" alt="04" src="https://user-images.githubusercontent.com/897510/61271102-9e2f7780-a7de-11e9-8b4e-ddbd5e57d19b.png">
> (Read a key file on a node startup)

A node processes prevote messages like this.

<img width="592" alt="05" src="https://user-images.githubusercontent.com/897510/61271104-9e2f7780-a7de-11e9-9f11-2c6737dc1f68.png">
> (Validator’s Signing Sequence)

<img width="949" alt="06" src="https://user-images.githubusercontent.com/897510/61271105-9e2f7780-a7de-11e9-9fa2-2f73ddbc58ad.png">
> (Sign a vote)

The main part is the `signAddVote` function of the `ConsensusState` object. The first line of the function decides whether it signs.

Our test node can execute the next `signVote` function because `cs.Validators.HasAddress(pubkey_addr) == true`. Validator information is registered already.


#### 4-3. What caused a double sign?

The proposer of the 474,404th block was “nonce - LunaWhale.com”. Every node calls `enterPropose()` (`consensus/state.go`) each round. This function checks whether its own node is in the current block validator set and its own node is the proposer of this block. If it is the proposer of the current block and it has not received a valid block (`defaultDecideProposal()`), it tries to propose a block (`createProposalBlock()`, and `CreateProposalBlock()` in `state/execution.go`).

Two nodes under the validator key of “nonce - LunaWhale.com” made their own blocks respectively. Then two nodes signed their own blocks. That is a double sign. Even if new node does not register and the CLI account of new node does not hold any Luna, new node acts as a validator without coordinating with old node.

<img width="612" alt="07" src="https://user-images.githubusercontent.com/897510/61271106-9ec80e00-a7de-11e9-8373-1a3b4c95a644.png">
> (Proposer’s Signing Sequence)


#### 4-4. Who discovered a double sign?

On receiving `VoteMsg`s, nodes collect validators’ votes to maintain a last committed information. If a VoteMsg has the same height, round, type, validator address, and validator index with any existing validator vote but it has a different block id (block hash), node generates a double sign evidence.

<img width="800" alt="08" src="https://user-images.githubusercontent.com/897510/61271108-9ec80e00-a7de-11e9-9c30-9396d2fb6acc.png">
> (Evidence Generation)

<img width="945" alt="09" src="https://user-images.githubusercontent.com/897510/61271109-9ec80e00-a7de-11e9-8940-b806ab149952.png">

Terra nodes act as a validator, if it is within the validator set of the current block. In the Tendermint layer, it acts as a validator even if it has different operator key and this operator does not have any Luna.

Our validator node has held in a jail. While an inactive penalty puts nodes in a jail for the given period, a double sign jails nodes permanently.


## 5. Improvements

#### 5-1. Server Infrastructure
- Monitor a server, process, and logs
  - Prevent an inactive slashing
- Prevent DDOS attacks with Sentry nodes
  - https://cosmos.network/docs/cosmos-hub/validators/security.html
  - https://forum.cosmos.network/t/sentry-node-architecture-overview/454
- High availability without fear of double signs

#### 5-2. Operation
1. Better network structure by `persistent_peers` with reliable validators
1. Distribute stakes among many nodes
  - Terraform Labs 사례 example (“Terraform Labs - Ghost”, “Terraform Labs - Goliath”, “Terraform Labs - Marine”, “Terraform Labs - Wraith”)
1. Prevent possible attacks that induce a double sign
  - Examine the GoS (Game of Stakes) competition
1. Key management system with HSM (Hardware Security Module)
1. Reduce missed precommits
  - Investigate propagation delay issues
  - <img width="789" alt="10" src="https://user-images.githubusercontent.com/897510/61271110-9ec80e00-a7de-11e9-9d50-9646ecf3c584.png">

## 6. Conclusion
As a validator, Apologize to deligators who have trusted us and committed their valuable assets..
 
Through this experience, we have had to worry about the validator role and direction.

As a result, we concluded that sharing this experience for the benefit of community members. And we will continuously contribute to community, to make a solid terra project. 

As a trustworthy restorer, we will do our best by building a more robust system and will share our experience continuously.
Many thanks.


nonce - LunaWhale.com

