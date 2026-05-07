export function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold mb-8">About SoleTrack</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            SoleTrack is dedicated to preserving and promoting traditional Filipino and Bicol footwear 
            craftsmanship while supporting local artisan communities.
          </p>

          <h2 className="text-3xl font-bold mb-4 mt-12">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We bridge the gap between traditional Filipino artisans and the modern market, bringing 
            authentic handcrafted footwear from Bicol and across the Philippines to customers worldwide. 
            Every pair of shoes tells a story of heritage, skill, and community.
          </p>

          <h2 className="text-3xl font-bold mb-4 mt-12">Our Values</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Heritage & Craftsmanship</h3>
              <p className="text-gray-600">
                Each product is handcrafted using traditional methods passed down through generations. 
                From Bakya to woven abaca sandals, we honor Filipino footwear heritage.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We use natural, locally-sourced materials like bamboo, pandan, rattan, and abaca. 
                Our eco-friendly approach supports both the environment and traditional farming communities.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Empowering Artisans</h3>
              <p className="text-gray-600">
                Every purchase directly supports Filipino artisans and their families. We ensure fair 
                compensation and help preserve traditional crafts for future generations.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4 mt-12">The Bicol Connection</h2>
          <p className="text-gray-600 mb-6">
            Bicol region is renowned for its rich weaving traditions and skilled craftspeople. Our 
            partnerships with Bicolano artisans help preserve these valuable skills while providing 
            sustainable livelihoods. From abaca fiber to bamboo crafts, Bicol's natural resources and 
            expertise shine through in every product.
          </p>

          <h2 className="text-3xl font-bold mb-4 mt-12">Join Our Journey</h2>
          <p className="text-gray-600 mb-6">
            When you choose SoleTrack, you're not just buying footwear – you're supporting Filipino 
            heritage, sustainable practices, and artisan communities. Thank you for walking this path with us.
          </p>
        </div>
      </div>
    </div>
  );
}