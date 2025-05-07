function extractChunks(text, keyphrase, maxLength = 200) {
    const regex = new RegExp(keyphrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    let match;
    const chunks = {};
 
    while ((match = regex.exec(text)) !== null) {
        const matchStart = match.index;
        const chunkStart = Math.max(text.lastIndexOf(".", matchStart) + 1, 0);
        let chunkEnd = text.indexOf(".", matchStart);
        chunkEnd = chunkEnd !== -1 ? chunkEnd + 1 : text.length;
 
        let chunk = text.substring(chunkStart, chunkEnd).trim();
        if (chunk.length > maxLength) {
            chunk = chunk.substring(0, maxLength);
        }
 
        chunks[chunk] = (chunks[chunk] || 0) + 1;
    }
 
    return chunks;
}
 
const httpTrigger = async function (context, req) {
    try {
        const body = req.body;
        const values = body.values || [];
        const results = [];
 
        for (const record of values) {
            const recordId = record.recordId;
            const data = record.data || {};
            const text = (data.content || "").toLowerCase();
            const keyphrases = Array.isArray(data.keyphrases) ? data.keyphrases.map(k => k.toLowerCase()) : [];
 
            if (!text || keyphrases.length === 0) {
                results.push({
                    recordId,
                    errors: [{ message: "Missing content or keyphrases." }]
                });
                continue;
            }
 
            const allChunks = {};
 
            for (const keyphrase of keyphrases) {
                const chunks = extractChunks(text, keyphrase);
                for (const chunk in chunks) {
                    allChunks[chunk] = (allChunks[chunk] || 0) + chunks[chunk];
                }
            }
 
            const chunkList = Object.keys(allChunks).map(chunk => ({
                chunk,
                occurrences: allChunks[chunk]
            }));
 
            results.push({
                recordId,
                data: {
                    extractedChunks: chunkList
                }
            });
        }
 
        context.res = {
            status: 200,
            body: { values: results },
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (e) {
        context.res = {
            status: 500,
            body: { error: e.message },
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
 
module.exports = httpTrigger;
