// // components/Footer.jsx
import Link from 'next/link'
import { Github, Mail, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-8 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Column 1: Brand */}
        <div >
          <h2 className="text-2xl font-bold mb-2">NoteNest 🧠</h2>
          <p className="text-sm text-gray-300">
            Your private place to write, reflect, and organize.
          </p>
        </div>


        {/* Column 3: Social / Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Connect</h3>
          <div className="flex space-x-4 mt-2">
            <a href="mailto:contact@yoursite.com" className="hover:text-green-400"><Mail /></a>
            <a href="https://github.com/your-github" target="_blank" className="hover:text-green-400"><Github /></a>
            <a href="https://twitter.com/your-handle" target="_blank" className="hover:text-green-400"><Twitter /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} NoteNest. Built with ❤️ using Next.js & Tailwind CSS.
      </div>
    </footer>
  )
}

export default Footer
