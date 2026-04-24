"use server";

export async function getYouTubeSubscribers() {
    try {
        const apiKey = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        if (!apiKey) return "2.5K+";
        
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics&forHandle=%40diggitronic&key=${apiKey}`, { next: { revalidate: 3600 } });
        if (!res.ok) return "2.5K+";
        
        const data = await res.json();
        if (data.items && data.items.length > 0) {
            let count = parseInt(data.items[0].statistics.subscriberCount, 10);
            if (isNaN(count)) return "2.5K+";
            if (count >= 1000) {
                return (count / 1000).toFixed(1).replace('.0', '') + "K+";
            }
            return count.toString() + "+";
        }
        return "2.5K+";
    } catch (e) {
        return "2.5K+";
    }
}
