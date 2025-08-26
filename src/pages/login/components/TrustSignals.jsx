import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const certifications = [
    {
      id: 1,
      name: 'OSHA Compliant',
      description: 'Occupational Safety and Health Administration certified',
      icon: 'Shield',
      color: 'text-success'
    },
    {
      id: 2,
      name: 'ISO 45001',
      description: 'International safety management standard',
      icon: 'Award',
      color: 'text-primary'
    },
    {
      id: 3,
      name: 'NIST Cybersecurity',
      description: 'National Institute of Standards compliance',
      icon: 'Lock',
      color: 'text-warning'
    },
    {
      id: 4,
      name: 'IEC 61508',
      description: 'Functional safety standard certified',
      icon: 'CheckCircle',
      color: 'text-success'
    }
  ];

  const testimonials = [
    {
      id: 1,
      company: 'Steel Manufacturing Corp',
      quote: `SafetyHelmet Monitor reduced our workplace incidents by 78% in the first six months. The real-time alerts have been game-changing for our safety protocols.`,
      author: 'Michael Rodriguez',
      position: 'Safety Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 2,
      company: 'Industrial Solutions Inc',
      quote: `The environmental monitoring capabilities helped us identify potential hazards before they became critical. Outstanding system reliability across all our facilities.`,
      author: 'Sarah Chen',
      position: 'Plant Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 3,
      company: 'Construction Dynamics LLC',
      quote: `Implementation was seamless and the ROI was immediate. Our insurance premiums dropped significantly due to improved safety metrics and compliance reporting.`,
      author: 'David Thompson',
      position: 'Operations Manager',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  return (
    <div className="space-y-8">
      {/* Safety Certifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Award" size={20} className="mr-2 text-primary" />
          Safety Certifications
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon name={cert?.icon} size={24} className={cert?.color} />
              <div>
                <h4 className="text-sm font-medium text-foreground">{cert?.name}</h4>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Client Testimonials */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2 text-primary" />
          Client Success Stories
        </h3>
        
        <div className="relative min-h-[200px]">
          {testimonials?.map((testimonial, index) => (
            <div
              key={testimonial?.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentTestimonial ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="space-y-4">
                <blockquote className="text-sm text-muted-foreground italic leading-relaxed">
                  "{testimonial?.quote}"
                </blockquote>
                
                <div className="flex items-center space-x-3">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{testimonial?.author}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial?.position}</p>
                    <p className="text-xs text-primary font-medium">{testimonial?.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Security Badge */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-center space-x-3">
          <Icon name="Shield" size={24} className="text-success" />
          <div className="text-center">
            <h4 className="text-sm font-medium text-foreground">Enterprise Security</h4>
            <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;