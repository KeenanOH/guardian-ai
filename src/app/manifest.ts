import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "GuardianAI",
        short_name: "GuardianAI",
        description: "Your AI mental health companion",
        start_url: "/",
        display: "fullscreen",
        background_color: "#fff",
        theme_color: "#fff"
    }
}
