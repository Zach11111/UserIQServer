function scoreTest(test) {
    const baseIQ = 100
    const genshin = genshinScore(test.genshin)
    const games = gamesScore(test.games)
    const sleep = sleepScore(test.sleep)
    const discordBingo = discordBingoScore(test.discordBingo)
    const vanity = vanityScore(test.vanity, test.vanityUrlNum)
    const tipsVideo = tipsVideoScores(test.tipsvideos)
    const edater = edaterScore(test.edater)
    const status = statusScore(test.status)
    const renames = renamesScore(test.renames)
    const theme = themeScore(test.theme)
    const pings = pingsScore(test.pings)
    const featureRanking = featureRankingScore(test.featureRanking)
    const punctuation = punctuationScore(test.punctuation)
    const nitro = nitroScore(test.nitro)
    const discordMobile = discordMobileScore(test.discordMobile)
    const muteServers = muteServersScore(test.muteServers)
    const discordBots = discordBotsScore(test.discordBots)
    const discordProfessional = discordProfessionalScore(test.discordProfessional)

    console.log({
        baseIQ,
        genshin,
        games,
        sleep,
        discordBingo,
        vanity,
        tipsVideo,
        edater,
        status,
        renames,
        theme,
        pings,
        featureRanking,
        punctuation,
        nitro,
        discordMobile,
        muteServers,
        discordBots,
        discordProfessional
    })

    return baseIQ + genshin + games + sleep + discordBingo + vanity + tipsVideo + 
           edater + status + renames + theme + pings + featureRanking + punctuation + 
           nitro + discordMobile + muteServers + discordBots + discordProfessional
}

function genshinScore(answer) {
    const a = Number(answer) / 10 + 3
    return -a
}

function gamesScore(answer) {
    if (answer === null || answer === undefined) return 0
    const a = Number(answer) * 10 + 2
    return -a
}

function sleepScore(answer) {
    if (answer < 4 || answer > 10) {
        return -10
    } else if (answer >= 7 && answer <= 9) {
        return 10
    } else {
        return 0
    }
}

function discordBingoScore(answer) {
    const scores = {
        1: -10,
        2: -10,
        3: -5,
        4: -5,
        5: -8
    }
    return answer.split(',').reduce((sum, num) => sum + (scores[num] || 0), 0)
}


function tipsVideoScores(answer) {
    if (answer === "0") return 0;
    if (answer === "1") return 10;
}

function edaterScore(answer) {

    const scores = {
        1: -5,
        2: -10,
        3: 5,
        4: 6
    }
    return answer.split(',').reduce((sum, num) => sum + (scores[num] || 0), 0)


}

function statusScore(answer) {
    switch (answer) {
        case "0":
            return 10;
        case "1":
            return 5;
        case "2":
            return -5;
        case "3":
            return -10;
    }
}

function renamesScore(answer) {
    switch (answer) {
        case "0":
            return 10;
        case "1":
            return 5;
        case "2":
            return -5;
        case "3":
            return -7;
    }
}

function vanityScore(answer, realAnswer) {
    let score = -realAnswer * 12;

    if (answer === "0" && realAnswer === 0) score += 23;
    if (answer === "1" && realAnswer > 0) score -= 11;

    return score;
}


function themeScore(answer) {
    switch (answer) {
        case "0":
            return 10;
        case "1":
            return 5;
        case "2":
            return 5;
        case "3":
            return -10;
    }
}


function pingsScore(answer) {
    if (answer < 0 || answer > 100) return -10;
    
    switch (true) {
        case answer === 0:
            return 10;
        case answer <= 5:
            return 5;
        case answer <= 15:
            return 0;
        case answer <= 30:
            return -5
        case answer <= 50:
            return -10;
        default:
            return -15;
}
}

function featureRankingScore(answer) {
    const positionWeights = [10, 5, 0, -5, -10];
    
    const rankings = answer.split(',').map(Number);
    
    const optimalFeatures = {
        0: 3,
        1: 1,
        2: 4,
        3: 0,
        4: 2 
    };

    let score = 0;
    
    rankings.forEach((featureIndex, position) => {
        const optimalPosition = Object.entries(optimalFeatures)
            .find(([_, value]) => value === featureIndex)?.[0];
        
        const positionDifference = Math.abs(position - Number(optimalPosition));
        
        if (positionDifference <= 1) {
            score += positionWeights[position];
        } else {
            score -= Math.abs(positionWeights[position]);
        }
    });

    return score;
}

function punctuationScore(answer) {
    switch (answer) {
        case "0":
            return -5;
        case "1":
            return 5;
        case "2":
            return 10;
        case "3":
            return 5;
        case "4":
            return -5;
        default:
            return 0;
    }
}

function nitroScore(answer) {
    switch (answer) {
        case "0":
            return 10;
        case "1":
            return 5;
        case "2":
            return 0;
        case "3":
            return -5;
        case "4":
            return -10;
        default:
            return 0;
    }
}

function discordMobileScore(answer) {
    switch (answer) {
        case "0": 
            return 10;
        case "1": 
            return 5;
        case "2": 
            return 0;
        case "3": 
            return -5;
        case "4": 
            return -10;
        default:
            return 0;
    }
}

function muteServersScore(answer) {
    switch (answer) {
        case "0": 
            return -10;
        case "1": 
            return -5;
        case "2": 
            return 0;
        case "3": 
            return 5;
        case "4": 
            return 10;
        default:
            return 0;
    }
}

function discordBotsScore(answer) {
    switch (answer) {
        case "0": 
            return -5;
        case "1": 
            return 0;
        case "2": 
            return 5;
        case "3": 
            return 10;
        case "4": 
            return 0;
        default:
            return 0;
    }
}

function discordProfessionalScore(answer) {
    switch (answer) {
        case "0": 
            return 10;
        case "1": 
            return 5;
        case "2": 
            return 0;
        case "3": 
            return -5;
        case "4": 
            return -10;
        default:
            return 0;
    }
}

module.exports = scoreTest
