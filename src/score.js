function scoreTest(test) {
    const genshin = genshinScore(test.genshin)
    const games = gamesScore(test.games)
    const sleep = sleepScore(test.sleep)
    const discordBingo = discordBingoScore(test.discordBingo)
    return genshin + games + sleep + discordBingo
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
        2: 10,
        3: -5,
        4: 5,
        5: -8
    }
    return answer.split(',').reduce((sum, num) => sum + (scores[num] || 0), 0)
}

module.exports = scoreTest
