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
    return  baseIQ + genshin + games + sleep + discordBingo + vanity + tipsVideo + edater + status + renames + theme + pings
}

function genshinScore(answer) {
    const a = answer / 10 + 3
    return -a
}

function gamesScore(answer) {
    const a = answer * 10 + 2
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

    switch (answer) {
        case "0":
            return -5;
        case "1":
            return -10;
        case "2":
            return 5;
        case "3":
            return 6;
    }


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

module.exports = scoreTest
