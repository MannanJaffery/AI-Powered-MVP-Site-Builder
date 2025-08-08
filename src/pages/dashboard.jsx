import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useUsername from "../services/getcurrentusername";
import { Plus, Calendar, Users, ChevronDown, ChevronUp, Mail, User } from "lucide-react";

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
          // Waitlist data is now embedded in the product document
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-900">
                {username}'s Dashboard
              </h1>
              <p className="text-sm sm:text-base mt-1">
                Manage products and track engagement
              </p>
            </div>
            <Link
              to="/input-idea"
              className="inline-flex items-center gap-2 bg-purple-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-purple-800 transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Product</span>
              <span className="inline sm:hidden">New</span>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-xl border border-purple-100 p-8 sm:p-12 text-center">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="text-purple-500" size={24} />
            </div>
            <h3 className="text-lg font-medium text-purple-900 mb-2">No products yet</h3>
            <p className="text-purple-600 mb-6 max-w-md mx-auto">Create your first product to get started</p>
            <Link
              to="/new-project"
              className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-2.5 rounded-lg hover:bg-purple-800 transition-colors text-sm md:text-base"
            >
              <Plus size={18} />
              Create Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  className="bg-white rounded-lg border border-purple-100 hover:border-purple-200 transition-colors h-72 flex flex-col shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Card Header */}
                  <div className="p-4 border-b border-purple-50 flex-shrink-0">
                    <Link 
                      to={`/${username}/${product.productName}`}
                      className="group block"
                    >
                      <h3 className="font-semibold text-purple-900 group-hover:text-purple-700 transition-colors line-clamp-2 mb-1">
                        {product.productName}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-1.5 text-xs text-purple-500">
                      <Calendar size={12} />
                      <span>{createdAtFormatted}</span>
                    </div>
                  </div>

                  {/* Waitlist Section */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-purple-400" />
                        <span className="text-sm font-medium text-purple-900">
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
                              Hide <ChevronUp size={12} />
                            </>
                          ) : (
                            <>
                              View <ChevronDown size={12} />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Expanded Waitlist */}
                    {isExpanded && waitlist.length > 0 && (
                      <div className="flex-1 border-t border-purple-50 pt-3">
                        <div className="space-y-2 h-28 overflow-y-auto pr-2 -mr-2">
                          {waitlist.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 text-purple-700 text-xs font-medium">
                                {entry.name?.charAt(0)?.toUpperCase() || <User size={12} className="text-purple-500" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-purple-900 truncate">
                                  {entry.name || 'Anonymous'}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-purple-500">
                                  <Mail size={10} />
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