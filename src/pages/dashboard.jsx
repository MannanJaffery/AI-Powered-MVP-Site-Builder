import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useUsername from "../services/getcurrentusername";
import { Plus, Calendar, Users, ChevronDown, ChevronUp, Mail, User } from "lucide-react";
import Loader from "../components/loading";
import { LinkIcon ,CopyIcon } from "lucide-react";

const Dashboard = () => {
  const username = useUsername();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const pagesRef = collection(db, "users", id, "pages");
        const pagesSnap = await getDocs(pagesRef);
        
        const productList = pagesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          waitlist: doc.data().waitlist || []
        }));
        
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const toggleExpand = (productId) => {
    setExpanded((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };




const [copied, setCopied] = useState(false);

const handleCopy = async (link) => {
  try {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // optional feedback reset
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    {/* Header Section */}
    <div className="mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {username}'s Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage your products and track customer engagement
          </p>
        </div>
        <Link
          to="/input-idea"
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm shadow-sm hover:shadow-md"
        >
          <Plus size={18} className="shrink-0" />
          <span className="hidden sm:inline">New Product</span>
          <span className="inline sm:hidden">New Product</span>
        </Link>
      </div>
    </div>


    {products.length === 0 ? (
      <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="text-purple-600" size={24} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products published yet</h3>
        <p className="text-gray-500 mb-6">
          Create your first product to start building your waitlist
        </p>
        <Link
          to="/new-project"
          className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm hover:shadow-md w-full sm:w-auto"
        >
          <Plus size={18} />
          Create Product
        </Link>
      </div>
    ) : (
      /* Products Grid */
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => {
          const waitlist = product.waitlist || [];
          const isExpanded = expanded[product.id];
          const createdAtFormatted = product.createdAt
            ? new Date(product.createdAt.seconds * 1000).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })
            : "Unknown";

          return (
            <div 
              key={product.id} 
              className="bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-all h-80 flex flex-col shadow-sm hover:shadow-md overflow-hidden"
            >

              <div className="p-5 border-b border-gray-100 flex-shrink-0">
                <Link 
                  to={`/${username}/${product.productName}`}
                  className="group block"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2 mb-2 text-lg">
                    {product.productName}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={14} className="text-gray-400" />
                  <span>Created {createdAtFormatted}</span>
                </div>


          <div className="mt-2 flex items-center gap-2">
  <span className="font-medium">Link:</span>

  <a
    href={`https://mvp-go-seven.vercel.app/${encodeURIComponent(username)}/${encodeURIComponent(product.productName)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
  >
    <LinkIcon size={14} />
    <span
      className="truncate max-w-[200px]"
      
    >
      {`https://mvp-go-seven.vercel.app/${encodeURIComponent(username)}/${encodeURIComponent(product.productName)}`}
    </span>
  </a>

  <button
   onClick={() => handleCopy(`https://mvp-go-seven.vercel.app/${encodeURIComponent(username)}/${encodeURIComponent(product.productName)}`)}

    className="ml-2 text-gray-500 hover:text-gray-800"
    title="Copy link"
  >
    <CopyIcon size={16} />
  </button>

  {copied && <span className="text-sm text-green-600">Copied!</span>}
</div>


              </div>

              {/* Waitlist Section */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-purple-500" />
                    <span className="text-sm font-medium text-gray-900">
                      {waitlist.length} {waitlist.length === 1 ? 'subscriber' : 'subscribers'}
                    </span>
                  </div>
                  
                  {waitlist.length > 0 && (
                    <button
                      onClick={() => toggleExpand(product.id)}
                      className="flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Hide <ChevronUp size={14} />
                        </>
                      ) : (
                        <>
                          View <ChevronDown size={14} />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Expanded Waitlist */}
                {isExpanded && waitlist.length > 0 && (
                  <div className="flex-1 border-t border-gray-100 pt-4">
                    <div className="space-y-3 h-[136px] overflow-y-auto pr-2 -mr-2 custom-scrollbar">
                      {waitlist.map((entry, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 text-purple-700 text-xs font-medium">
                            {entry.name?.charAt(0)?.toUpperCase() || <User size={14} className="text-purple-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {entry.name || 'Anonymous'}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Mail size={12} />
                              <span className="truncate">{entry.email}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
</div>
  );
};

export default Dashboard;