
export const handleAsk = async (question) => {
    const response = await fetch('http://ec2-13-60-96-174.eu-north-1.compute.amazonaws.com/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });
    if (response.ok) {
        const data = await response.json();
        // console.log(data)
        const answerObject = {
            question : question,
            answer : data.result,
            sources : data.source_documents,
            youtube : data.youtube_videos
        };
        return answerObject
    }
    
}










