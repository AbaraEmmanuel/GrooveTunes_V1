import Link from "next/link"
import Image from "next/image"
import { Music, ListMusic, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto text-center md:px-6 lg:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-emerald-500 md:text-5xl lg:text-6xl animate-fade-in">
          Welcome to GrooveTunes
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground md:text-xl">
          Discover, listen, and enjoy your favorite music with our cutting-edge music player.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-emerald-500 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
          >
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16 mx-auto md:px-6">
        <h2 className="mb-12 text-3xl font-bold text-center text-emerald-500 md:text-4xl">Why GrooveTunes?</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden transition-all duration-300 border-none shadow-lg hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100">
                <Music className="w-8 h-8 text-emerald-500" />
              </div>
              <CardTitle className="mb-2 text-xl">Extensive Music Library</CardTitle>
              <CardDescription className="text-base">
                Explore millions of songs from various genres and artists. Your next favorite track is just a click
                away!
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all duration-300 border-none shadow-lg hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100">
                <ListMusic className="w-8 h-8 text-emerald-500" />
              </div>
              <CardTitle className="mb-2 text-xl">Create Playlists</CardTitle>
              <CardDescription className="text-base">
                Build and manage your playlists effortlessly. Create the perfect mix for every mood and occasion.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all duration-300 border-none shadow-lg hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100">
                <Play className="w-8 h-8 text-emerald-500" />
              </div>
              <CardTitle className="mb-2 text-xl">Seamless Playback</CardTitle>
              <CardDescription className="text-base">
                Enjoy smooth and uninterrupted playback with our high-quality audio streaming technology.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Artists Section */}
      <section className="container px-4 py-16 mx-auto md:px-6">
        <h2 className="mb-12 text-3xl font-bold text-center text-emerald-500 md:text-4xl">
          Top Trending Afrobeats Artists
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ArtistCard
            name="Davido"
            image="https://media.premiumtimesng.com/wp-content/files/2023/07/Davido.png"
            description="Davido is a Nigerian singer, songwriter, and record producer. He blends traditional African elements with global mainstream pop."
          />

          <ArtistCard
            name="Wizkid"
            image="https://i.scdn.co/image/ab6761610000e5eb9050b61368975fda051cdc06"
            description="Wizkid is a Nigerian singer and songwriter. One of Africa's biggest artists, he is the most decorated Nigerian artist ever."
          />

          <ArtistCard
            name="Burna Boy"
            image="https://dailytrust.com/wp-content/uploads/2023/04/Burna-Boy-scaled-1.jpg"
            description="Burna Boy is a Nigerian singer, songwriter, and performer. He is known for his fusion of Afrobeat, dancehall, and reggae music."
          />
        </div>
      </section>
    </div>
  )
}

function ArtistCard({ name, image, description }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 border-none shadow-lg hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-80 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-6">
        <CardTitle className="mb-2 text-xl">{name}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
