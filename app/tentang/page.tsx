import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami - Pesan Yuk",
  description: "Kenali lebih dekat dengan Pesan Yuk, layanan pesan antar makanan terpercaya",
};

export default function TentangPage() {
  return (
    <div className="w-full pt-24">
      <div className="w-full py-8 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Tentang Kami</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Beranda
              </Link>
              <span className="mx-2">/</span>
              <span>Tentang Kami</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Menghadirkan Pengalaman Kuliner Terbaik ke Rumah Anda</h2>
            <p className="text-muted-foreground">
              Pesan Yuk adalah platform pesan antar makanan yang menghubungkan pelanggan dengan restoran-restoran terbaik. 
              Kami berkomitmen untuk memberikan pengalaman kuliner yang luar biasa dengan layanan pengiriman yang cepat dan andal.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Restoran Mitra</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Pelanggan Puas</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">100K+</div>
                <div className="text-sm text-muted-foreground">Pesanan Selesai</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm text-muted-foreground">Kota Terjangkau</div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Tim Pesan Yuk"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Mengapa Memilih Kami?</h2>
          <p className="text-muted-foreground">
            Kami berkomitmen untuk memberikan layanan terbaik dengan standar kualitas tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <Card>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Pengiriman Cepat</h3>
              <p className="text-sm text-muted-foreground">
                Layanan pengiriman cepat dengan jaminan makanan tetap hangat saat sampai.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Kualitas Terjamin</h3>
              <p className="text-sm text-muted-foreground">
                Restoran mitra terpilih dengan standar kualitas yang ketat.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Layanan Pelanggan</h3>
              <p className="text-sm text-muted-foreground">
                Tim support yang siap membantu 24/7 untuk segala kebutuhan Anda.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Jangkauan Luas</h3>
              <p className="text-sm text-muted-foreground">
                Melayani berbagai wilayah dengan jaringan pengiriman yang luas.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/30 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Bergabung dengan Pesan Yuk</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Jadilah bagian dari revolusi kuliner digital. Bergabung sebagai mitra restoran atau mulai karir Anda bersama kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Daftar Sebagai Mitra</Button>
            <Button size="lg" variant="outline">Karir di Pesan Yuk</Button>
          </div>
        </div>
      </div>
    </div>
  );
}