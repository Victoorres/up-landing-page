'use client';

import React from 'react';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

interface CarouselItem {
  title: string;
  description: string;
  image: string;
  highlights: string[];
}

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const carouselItems: CarouselItem[] = [
    {
      title: 'Conectando profissionais, gerando oportunidades',
      description:
        'Um clube exclusivo que une profissionais de interiores, arquitetos, paisagistas e engenheiros para colaboração e crescimento mútuo.',
      image: '/placeholder.svg?height=800&width=1200',
      highlights: ['Conectando', 'oportunidades'],
    },
    {
      title: 'Eventos presenciais com networking estratégico',
      description:
        'Participe de encontros mensais, workshops e palestras com especialistas do mercado para expandir sua rede de contatos.',
      image: '/placeholder.svg?height=800&width=1200',
      highlights: ['eventos', 'networking'],
    },
    {
      title: 'Parcerias inteligentes para promover colaboração',
      description: 'Desenvolva projetos em conjunto com outros profissionais e amplie seu portfólio de serviços.',
      image: '/placeholder.svg?height=800&width=1200',
      highlights: ['parcerias', 'colaboração'],
    },
    {
      title: 'Crescimento e evolução profissional constante',
      description:
        'Acesse conteúdos exclusivos, mentorias e treinamentos para se manter atualizado com as tendências do mercado.',
      image: '/placeholder.svg?height=800&width=1200',
      highlights: ['Crescimento', 'profissional'],
    },
  ];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentItem = carouselItems[currentIndex];

  const highlightWords = (text: string, wordsToHighlight: string[]) => {
    if (!wordsToHighlight.length) return <>{text}</>;

    const regex = new RegExp(`(${wordsToHighlight.join('|')})`, 'gi');

    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) => {
          const isHighlighted = wordsToHighlight.some((word) => part.toLowerCase() === word.toLowerCase());

          return isHighlighted ? (
            <span key={i} className="text-primary">
              {part}
            </span>
          ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 pb-16">
      {/* Carousel content */}
      <div className={cn('relative', isMobile ? 'pt-6 pb-12' : 'h-[600px]')}>
        <div
          className={cn(
            'container relative z-10',
            isMobile ? 'flex flex-col gap-6' : 'grid gap-8 md:grid-cols-2 md:gap-12 items-center h-full py-10'
          )}
        >
          <div className="space-y-4 md:space-y-6 max-w-[600px]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter">
              {highlightWords(currentItem.title, currentItem.highlights)}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground line-clamp-3 md:line-clamp-4">
              {currentItem.description}
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] md:h-[350px] rounded-lg overflow-hidden">
            <Image
              src={currentItem.image || '/placeholder.svg'}
              alt={currentItem.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out"
              priority
            />
          </div>
        </div>
      </div>

      {/* Navigation buttons - visíveis apenas em telas maiores */}
      <div className="hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={prevSlide}
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Anterior</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={nextSlide}
          disabled={isTransitioning}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Próximo</span>
        </Button>
      </div>

      {/* CTA Buttons */}
      <div className="container pb-12">
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto sm:mx-0">
          <Button size="lg" className="w-full sm:w-auto">
            Ver eventos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Saiba mais
          </Button>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all duration-300',
              index === currentIndex ? 'bg-primary w-8' : 'bg-primary/40 hover:bg-primary/60'
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile navigation buttons - visíveis apenas em telas menores */}
      <div className="md:hidden container flex justify-between mt-4">
        <Button variant="outline" size="sm" className="rounded-full" onClick={prevSlide} disabled={isTransitioning}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Anterior</span>
        </Button>

        <Button variant="outline" size="sm" className="rounded-full" onClick={nextSlide} disabled={isTransitioning}>
          <span>Próximo</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
