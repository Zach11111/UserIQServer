function scoreTest(test) {
    const baseIQ = 100
    const genshin = genshinScore(test.genshin)
    const games = gamesScore(test.games)
    const sleep = sleepScore(test.sleep)
    const discordBingo = discordBingoScore(test.discordBingo)
    const vanity = vanityScore(test.vanity, test.vanityUrlNum)
    return  baseIQ + genshin + games + sleep + discordBingo + vanity
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


function vanityScore(answer, realAnswer) {
    let score = -realAnswer * 12;

    if (answer === "0" && realAnswer === 0) score += 23;
    if (answer === "1" && realAnswer > 0) score -= 11;

    return score;
}


module.exports = scoreTest
