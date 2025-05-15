import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatInterface } from "@/components/chat/chat-interface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <section className="w-full max-w-3xl text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-primary mb-4 sm:text-5xl">
            Welcome to Daruka
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Daruka is an intelligent assistant designed to help you with your queries. 
            Interact with our chat interface below to get started. Ask questions, seek information, 
            and let Daruka guide you.
          </p>
        </section>
        
        <section className="w-full">
          <ChatInterface />
        </section>

        <section className="w-full max-w-3xl text-center mt-16">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">How it Works</CardTitle>
                    <CardDescription>Simple steps to get assistance from Daruka.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-left text-foreground">
                    <div className="flex items-start gap-4">
                        <span className="text-accent font-bold text-2xl">1.</span>
                        <p>Type your question or request into the chat input field.</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="text-accent font-bold text-2xl">2.</span>
                        <p>Press "Send" or hit Enter to submit your message.</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="text-accent font-bold text-2xl">3.</span>
                        <p>Daruka will process your request and provide a response in real-time.</p>
                    </div>
                     <div className="flex items-start gap-4">
                        <span className="text-accent font-bold text-2xl">4.</span>
                        <p>Continue the conversation as needed. Daruka remembers the context of your chat.</p>
                    </div>
                </CardContent>
            </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
